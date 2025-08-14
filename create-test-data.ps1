# Simple Test Data Creator (ASCII-only)
$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"
Write-Host '=== Creating Test Data ===' -ForegroundColor Cyan

$apiUrl = "http://localhost:8000"
$loginData = @{username="admin@example.com";password="admin123"} | ConvertTo-Json

Write-Host 'Logging in...' -ForegroundColor Yellow
$loginResponse = Invoke-RestMethod -Uri "$apiUrl/api/v1/auth/login" -Method POST -ContentType "application/json" -Body $loginData
$headers = @{"Authorization"="Bearer $($loginResponse.access_token)";"Content-Type"="application/json"}
Write-Host 'Login successful!' -ForegroundColor Green

# Create 3 jobs quickly
Write-Host 'Creating jobs...' -ForegroundColor Yellow
$jobs = @(
    @{ title='React Developer'; description='Frontend dev'; requirements='React, JS'; department='Tech'; location='Istanbul'; salary_range='15000-25000'; is_active=$true },
    @{ title='Python Developer'; description='Backend dev'; requirements='Python, API'; department='Tech'; location='Ankara'; salary_range='12000-20000'; is_active=$true },
    @{ title='Product Manager'; description='Product strategy'; requirements='PM experience'; department='Product'; location='Istanbul'; salary_range='20000-30000'; is_active=$true }
)

$jobIds = @()
foreach ($jobItem in $jobs) {
    $jobBody = $jobItem | ConvertTo-Json -Depth 5
    $job = Invoke-RestMethod -Uri "$apiUrl/api/v1/jobs" -Method POST -Body $jobBody -Headers $headers
    $jobIds += $job.id
    Write-Host ('Created job: ' + $job.title) -ForegroundColor Green
}

# Create 6 candidates quickly
Write-Host 'Creating candidates...' -ForegroundColor Yellow
$candidates = @("Ayse Yilmaz","Mehmet Demir","Fatma Sahin","Ali Kaya","Zeynep Ozkan","Burak Celik")
$candidateCount = 0

foreach ($name in $candidates) {
    $email = ('test' + $candidateCount + '@example.com')
    $jobId = $jobIds[$candidateCount % $jobIds.Count]
    
    $candidateBody = @{
        name = $name
        email = $email
        phone = "+90 532 123 45" + (10 + $candidateCount).ToString().PadLeft(2,'0')
        job_id = $jobId
        experience_years = 3 + ($candidateCount % 4)
        skills = "JavaScript, React, Python"
        notes = "Test candidate"
    } | ConvertTo-Json
    
    $candidate = Invoke-RestMethod -Uri "$apiUrl/api/v1/candidates" -Method POST -Body $candidateBody -Headers $headers
    Write-Host ('Created candidate: ' + $name) -ForegroundColor Green
    
    # Send interview link
    try {
        Invoke-RestMethod -Uri "$apiUrl/api/v1/candidates/$($candidate.id)/send-link" -Method POST -Headers $headers
        Write-Host 'Interview link sent' -ForegroundColor Cyan
    } catch {
        Write-Host 'Link send failed' -ForegroundColor Yellow
    }
    
    $candidateCount++
}

Write-Host 'Test data created!' -ForegroundColor Green
Write-Host 'Visit http://localhost:3000 to see data in admin panel' -ForegroundColor White
Write-Host 'Reports page now has visual charts and data' -ForegroundColor White
