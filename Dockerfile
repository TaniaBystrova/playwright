FROM mcr.microsoft.com/playwright:v1.39.0-jammy

COPY . /aqa-playwright-1
WORKDIR /aqa-playwright-1
RUN npm ci

CMD ["npm", "test"]