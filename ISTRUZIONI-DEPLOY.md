# davidepaganelli.it — istruzioni deploy su GitHub Pages

## 1. File da caricare tu (nomi esatti)

| Contenuto | Percorso e nome file |
|---|---|
| RottenLand PDF | `assets/pdf/rottenland.pdf` |
| RottenLand copertina (opzionale) | `assets/img/rottenland/cover.jpg` |
| Vanguard foto singola | `assets/img/vanguard/vanguard.jpg` |
| Contributor slideshow | `assets/img/contributor/contributor-01.jpg`, `contributor-02.jpg`, … fino a `-10` |
| SizeFive slideshow | `assets/img/sizefive/sizefive-01.jpg`, `sizefive-02.jpg`, … fino a `-10` |

Note:
- Solo formato `.jpg`, numeri sempre a due cifre (`-01`, `-02`…).
- Gli slideshow rilevano da soli quante foto ci sono (max 10), nessuna modifica al codice.
- Finché mancano le immagini appare il placeholder "NO SIGNAL" — è voluto.
- Consiglio: foto verticali o quadrate (i riquadri sono 4:5), max ~500KB l'una.

## 2. Pubblicare su GitHub (senza terminale)

1. Vai su github.com → **New repository** → nome es. `davidepaganelli.it`, Public → Create.
2. **Add file → Upload files** → trascina TUTTO il contenuto di questa cartella (inclusi `CNAME` e `.nojekyll`) → Commit.
3. **Settings → Pages** → Source: "Deploy from a branch" → Branch: `main` / `(root)` → Save.
4. Sempre in **Settings → Pages → Custom domain**: scrivi `davidepaganelli.it` → Save. Spunta "Enforce HTTPS" quando diventa disponibile (può volerci fino a 1h).

In alternativa da terminale:
```bash
cd "percorso/di/questa/cartella"
git init && git add -A && git commit -m "sito davidepaganelli.it"
git branch -M main
git remote add origin https://github.com/TUO-USERNAME/davidepaganelli.it.git
git push -u origin main
```

## 3. DNS del dominio (dal pannello del registrar)

Record **A** sul dominio radice `davidepaganelli.it` (tutti e 4):

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Record **CNAME** per `www` → `TUO-USERNAME.github.io`

La propagazione DNS può richiedere da pochi minuti a 24h.

## 4. Aggiornamenti futuri

Basta sostituire/aggiungere i file su GitHub (Upload files sovrascrive). Il sito si aggiorna da solo in 1-2 minuti.
