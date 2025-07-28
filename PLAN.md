# 🧠 Project Plan — Food Ordering Platform (10-Day Sprint)

## 🎯 Goal
Build a full-stack food ordering platform with real-time order tracking and kitchen dashboard using:
- React + Tailwind (Frontend)
- Node + Express + PostgreSQL (Backend)
- JSON-RPC + WebSockets
- Docker + docker-compose
- Optional: GitHub Actions + CI/CD deployment

## 📅 Timeline

| Day | Goal |
|-----|------|
| 0   | Project kickoff, GitHub, plan |
| 1-2 | Frontend setup (Vite, Tailwind, routing) |
| 3-4 | Menu display, Cart, localStorage |
| 4-6 | Checkout, Order Tracker, Kitchen view |
| 4-6 | Backend setup + DB migrations |
| 5-6 | JSON-RPC methods |
| 6-7 | WebSocket live updates |
| 7-8 | Analytics, Testing, Docker |
| 8-9 | Docs, Polish, Deployment |

## 🛑 Risks & Mitigations

| Risk | Impact | Solution |
|------|--------|----------|
| New to tech stack | High | Follow step-by-step guided learning |
| Time crunch | Medium | Stick to minimal viable features |
| Deployment issues | Medium | Use Render or Railway for quick hosting |
| WebSocket errors | Medium | Use heartbeat + retry logic |
| RPC errors | Medium | Use proper validation + structure |

## 📦 Final Deliverables

- Public GitHub repo with `/frontend`, `/backend`, `/infra`
- Live URLs (frontend, `/rpc`, `/ws`)
- SQL scripts (migrations + seeds)
- Postman/cURL sample
- Root `README.md` + `ARCHITECTURE.md`
- GitHub Actions pipeline (optional)
- Short demo video or gif
