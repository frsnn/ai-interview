FROM node:18-alpine

WORKDIR /usr/src/app

# Install pnpm globally – we can swap for npm if preferred
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./
RUN if [ -f pnpm-lock.yaml ]; then pnpm install; else npm install; fi

COPY . .

CMD ["npm", "run", "dev"] 