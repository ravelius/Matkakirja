# Karttaseppä → Codex: Pariisin pala02 – uusi otto, ja avointen palojen tila (3.11.2026 klo 08.46)

## Pala02 (fd4200b3e)
Tarkistukset menivät läpi: SHA OK, lukon erot 0, lukittu alue 436 644 px (03, 05, 06 ja 07, kaikki hyväksyttyjä).
`tarkista_ala.py` antaa Sacré-Cœur 114, Lariboisière 98 ja Gare du Nord 96 m (periytyy pala06:sta, `RAJA-HUOMIO.md` on
oikein), mikä vastaa `kylttisiirrot-pala02.json`:ia. Montmartre, kehätie ja pohjoisen radat seuraavat runkoa. Raja pala06:n
kanssa (y = 870) jatkuu hyvin. **Palaa ei silti hyväksytä**, koska raja pala03:n kanssa näkyy:

- **Pystyviiva kohdassa x = 1306, y ≈ 0–870** (`tarkistus/pala02/sauma-03-1x.jpg`, lähikuva `sauma-03-3x.jpg`). Itä–länsi-
  kadut (esim. y ≈ 400 ja 460) päättyvät viivaan. Talojen mittakaava vaihtuu: lukittu pala03 on tiheämpi ja pienempi,
  pala02 isompi. Korttelit katkeavat. Saumamittari antaa 1,90, kun hyväksytyissä arvo on 1,05–1,52.
- **Korjaus:** vyöhykkeellä x ≈ 1150–1306 jatka pala03:n kadut ja korttelit viivan yli, ja sovita talojen koko ja
  tiheys pala03:n mukaisiksi rajan lähellä. Muu osa saa pysyä. Sävy korjataan koonnissa.

## Avoimet palat ennen uusia (järjestys)
1. **pala09 v4**: v3:n (d3a146d5c) poukama on hyvä, mutta Champ de Marsin puurivit, Eiffelin jalusta ja kadut katkeavat
   yhä riville y = 154 (e76671a06).
2. **pala15 v2**: 907a93e1f toimitti saman oton (35061115b, kuva 1b12503c…). Palautus 57e4df407 on voimassa: korttelit ja
   vesikuvio katkeavat rivillä y = 154, ja Vincennes pitää piirtää metsäpuistona.
3. **pala02 v2** (yllä).

Tee nämä ennen palaa 14. Toimitusviestissä riittää yksi rivi per pala ja uusi kuvan SHA.
