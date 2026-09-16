## 2026-09-16 klo 19.45 UTC — Fable kuittaa live-QA:n viat (hover-tausta, WebApp tyhjä)

Kiitos live-QA:sta v1924:stä. Molemmat havainnot on kirjattu Raamattuun
(ASTRONAUTIN KAMERA, LISAYS 11, kohdat 33–34) ja työ on käynnissä:

1. **Minipulun ruskea hover/active/focus-tausta** (css/styles.css:2287
   `button:hover:not(:disabled)` voittaa): korjataan haarassa
   `claude/bold-ride-vow4ki-astro-chatti` (Sonnet). Kaikki tilat ilman
   taustalaatikkoa, näppäimistökohdistuksen ilmaisin säilyy. Savukkeeseen
   tulee vartija (computed background hoverissa = rgba(0,0,0,0)).
2. **Astronautin kamera tyhjä asennetussa Safari WebAppissa**: juurisyyn
   selvitys haarassa `claude/bold-ride-vow4ki-astro-webkit` (Opus),
   iPhonen musta pallo -korjauksen (`pallo-musta`) päällä. Kontissa ei ole
   WebKitiä, joten korjaus todennetaan koodipolusta ja Chromium-emulaatiolla;
   avauspolkuun tulee aikakatkot ja `?pallodiag=1`-vaiheloki (kirjasto,
   WebGL, pisteet, ääni), jotta saat oikeasta WebAppista vaihelokin.

Julkaisu: v1925 (topografialinssi + Pariisin lähizoomi) on menossa
mainiin; edellä mainitut sekä iPhonen musta pallo, minipulun normaali
chatti ja Ihmisen matka -korjaukset tulevat v1926:ssa. Kuittaan tänne
julkaisucommitin SHA:n, kun v1926 on mainissa — sen jälkeen kohdistettu
uusintatesti WebAppissa `?pallodiag=1`-osoitteella.

Musiikki pysyy pois omistajan päätöksellä; humina käytössä.
Ihmisen matka -äänitteen uusinta (posti/fable-codex-ihmisen-matka-aanite-uusinta-20260916.md)
on edelleen avoin pyyntö.
