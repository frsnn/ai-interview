"use client";
import { useEffect, useState, useRef } from "react";
import { apiFetch } from "@/lib/api";
import { speak, listen } from "@/lib/voice";

export default function InterviewPage({ params }: { params: { token: string } }) {
  const { token } = params;
  const [status, setStatus] = useState<
    | "loading"
    | "invalid"
    | "consent"
    | "permissions"
    | "permissionsDenied"
    | "test"
    | "intro"
    | "interview"
    | "finished"
  >("loading");
  const [error, setError] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [camPerm, setCamPerm] = useState<string | null>(null);
  const [micPerm, setMicPerm] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  // intro confirmation checkbox
  const [ready, setReady] = useState(false);
  const [devicesOk, setDevicesOk] = useState(false);

  // Conversational states
  const [question, setQuestion] = useState<string | null>(null);
  const [phase, setPhase] = useState<"idle" | "speaking" | "listening" | "thinking">("idle");
  const [history, setHistory] = useState<{ role: "assistant" | "user"; text: string }[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Verify the token once on mount
  useEffect(() => {
    apiFetch(`/api/v1/tokens/verify?token=${token}`, { method: "POST" })
      .then(() => setStatus("consent"))
      .catch((err: Error) => {
        setError(err.message);
        setStatus("invalid");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When we enter the permissions step, request camera/mic access
  useEffect(() => {
    if (status !== "permissions") return;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((s) => {
        setStream(s);
        setStatus("test");
      })
      .catch((err) => {
        console.error("Permission error", err);
        setPermissionError(err.message);
        setStatus("permissionsDenied");
      });
  }, [status]);

  // Attach stream to video element when ready (test/intro/interview)
  useEffect(() => {
    if (videoRef.current && stream && ["test", "intro", "interview"].includes(status)) {
      (videoRef.current as any).srcObject = stream;
    }
  }, [status, stream]);

  // Query permission states once we reach test step
  useEffect(() => {
    if (status !== "test" || !navigator.permissions) return;
    navigator.permissions.query({ name: "camera" as PermissionName }).then((p) => setCamPerm(p.state));
    navigator.permissions.query({ name: "microphone" as PermissionName }).then((p) => setMicPerm(p.state));
  }, [status]);

  // Schedule first question 2s after interview starts
  useEffect(() => {
    if (status !== "interview" || question !== null) return;
    const id = setTimeout(() => {
      setQuestion("Merhaba, kendinizi tanıtır mısınız?");
      setHistory((h) => [...h, { role: "assistant", text: "Merhaba, kendinizi tanıtır mısınız?" }]);
      setPhase("speaking");
    }, 2000);
    return () => clearTimeout(id);
  }, [status, question]);

  // Speak current question and then listen for answer
  useEffect(() => {
    if (status !== "interview" || question === null) return;

    let rec: any = null;
    speak(question, () => {
      setPhase("listening");

      let buffer: string[] = [];
      let silenceTimer: any = null;

      const finalize = () => {
        if (rec && rec.stop) rec.stop();
        const full = buffer.join(" ").trim();
        if (!full) return; // nothing captured

        // Update history with user's answer
        setHistory((h) => [...h, { role: "user", text: full }]);
        setPhase("thinking");

        apiFetch<{ question: string | null; done: boolean }>(
          "/api/v1/interview/next-question",
          {
            method: "POST",
            body: JSON.stringify({ history: [...history, { role: "user", text: full }] }),
          },
        )
          .then((res) => {
            if (res.done) {
              setPhase("idle");
              setStatus("finished");
            } else if (res.question) {
              setQuestion(res.question);
              setHistory((h) => [...h, { role: "assistant", text: res.question! }]);
              setPhase("speaking");
            }
          })
          .catch((err) => {
            console.error("AI error", err);
            setQuestion("Maalesef bir hata oluştu. Lütfen daha sonra yeniden deneyin.");
            setPhase("speaking");
          });
      };

      rec = listen(
        (t) => {
          buffer.push(t);
        },
        () => {
          if (silenceTimer) clearTimeout(silenceTimer);
          silenceTimer = setTimeout(finalize, 5000); // start timer when speech ends
        },
      );
    });

    return () => {
      if (rec && rec.stop) rec.stop();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [status, question]);

  if (status === "loading") return <p>Doğrulanıyor…</p>;
  if (status === "invalid") return <p>{error || "Bağlantı geçersiz veya süresi dolmuş."}</p>;

  if (status === "consent") {
    return (
      <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
        <h1>KVKK Aydınlatma Metni</h1>
        <p>
          Bu video mülâkat sırasında kaydedilen görüntü ve ses verileriniz, işe alım
          sürecinin yürütülmesi amacıyla işlenecek ve saklanacaktır.
        </p>
        <label style={{ display: "block", margin: "1rem 0" }}>
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          &nbsp; KVKK metnini okudum ve kabul ediyorum.
        </label>
        <button disabled={!accepted} onClick={() => setStatus("permissions")}>Devam Et</button>
      </div>
    );
  }

  // permissions step placeholder – will handle camera/mic permissions next
  if (status === "permissions") return <p>Kamera ve mikrofon izinleri isteniyor…</p>;

  if (status === "test")
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Cihaz Testi</h2>
        <div style={{ marginBottom: "1rem" }}>
          <strong>Tarayıcı İzinleri</strong>
          <p>Kamera: {camPerm || "?"} | Mikrofon: {micPerm || "?"}</p>
        </div>

        {/* Camera preview */}
        <video
          ref={videoRef}
          style={{ width: 240, height: 180, borderRadius: 8, objectFit: "cover", background: "#000" }}
          playsInline
          autoPlay
          muted
        />
        <div style={{ marginTop: "1rem" }}>
          <label>
            <input
              type="checkbox"
              checked={devicesOk}
              onChange={(e) => setDevicesOk(e.target.checked)}
            />
            &nbsp; Kameramı görüyorum ve mikrofonum çalışıyor.
          </label>
        </div>
        <button style={{ marginTop: "1.5rem" }} disabled={!devicesOk} onClick={() => setStatus("intro")}>İleri</button>
      </div>
    );

  if (status === "permissionsDenied")
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>İzin alınamadı: {permissionError}</p>
        <button onClick={() => setStatus("permissions")}>Tekrar Dene</button>
      </div>
    );

  // Intro step – show interview explanation and extra consent
  if (status === "intro") {
    return (
      <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
        <h2>Mülâkat Hakkında</h2>
        <p>
          Birazdan yapay zekâ destekli sesli bir görüşme başlayacak. Karşınızdaki avatar
          soruları sesli olarak soracak; siz de kameraya bakarak sesli yanıt vereceksiniz.
          Yanıtlarınız otomatik olarak metne dönüştürülecek ve sonraki sorular buna göre
          oluşturulacak.
        </p>
        <label style={{ display: "block", margin: "1rem 0" }}>
          <input
            type="checkbox"
            checked={ready}
            onChange={(e) => setReady(e.target.checked)}
          />
          &nbsp; Sürecin işleyişini anladım ve başlamak istiyorum.
        </label>
        <button disabled={!ready} onClick={() => setStatus("interview")}>Görüşmeyi Başlat</button>
      </div>
    );
  }

  if (status === "interview")
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
          {/* Avatar placeholder */}
          <div style={{ width: 160, height: 160, borderRadius: "50%", background: "#eee" }} />

          {/* Candidate preview */}
          <video
            ref={videoRef}
            style={{ width: 160, height: 160, borderRadius: "50%", objectFit: "cover" }}
            playsInline
            autoPlay
            muted
          />
        </div>

        <p style={{ marginTop: "1.5rem" }}>
          {phase === "speaking" && "Soru soruluyor…"}
          {phase === "listening" && "Dinleniyor…"}
          {phase === "thinking" && "Yanıt işleniyor…"}
          {phase === "idle" && "Görüşme yakında başlayacak…"}
        </p>
      </div>
    );

  if (status === "finished")
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Teşekkürler!</h2>
        <p>Görüşmemize katıldığınız için teşekkür ederiz. Değerlendirmeniz yakında yapılacaktır.</p>
      </div>
    );

  return null; // fallback
}

// --- Conversation side effects (hooks must be after component definition) --- 