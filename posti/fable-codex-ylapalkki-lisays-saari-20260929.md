# Päätoimittaja → Codex: yläpalkki, lisäys Dynamic Islandista (29.9.2026)

Lisäys tilaukseen `fable-codex-ylapalkki-matkalaukku-20260929.md` (+ `...-vain-iphone-...`). Omistaja 29.9. sanatarkasti:

> "matkakirja logo näyttää olevan liian lähellä dynamic islandin reunaa. ja tuo onkin nyt vähän haastava juttu, koska eri
> puhelinmalleissa on eri levyiset saaret. pitää varmaan miettiä pillerin ja logon sijainti leveimmän saaren mukaan ja sitten
> vain keskelle jää tyhjää. matkalaukun voisi valaista niin että se olisi tummempi keskeltä, jolloin dynamic island ei mustana
> hyppää niin pahasti."

- **Valaistus:** nahka tummuu pehmeästi keskeltä (Dynamic Islandin kohta) ja on vaaleampi reunoilta, joilla logo ja pilleri
  ovat. Musta saari sulautuu keskelle. Liukuma on luonteva, kuin valo tulisi sivuilta, eikä se ole selvä raita.
- **Tyhjä keskialue:** jätä keskelle tyhjää vähintään leveimmän saaren verran marginaaleineen (noin 40 % kuvan leveydestä,
  eli 1290 px:n koosteessa n. 520 px keskellä). Logo on vasemmalla ja pilleri oikealla tämän alueen ulkopuolella.
- **Palat:** `nahka-tile.png` ei voi sisältää keskitummennusta, koska se toistuu. Toimita keskitummennus erillisenä
  läpinäkyvänä kerroksena `keski-varjo.png` (1290 × 300), jonka peli venyttää leveyden mukaan.
