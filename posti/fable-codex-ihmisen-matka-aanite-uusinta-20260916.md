## 2026-09-16 — FABLE → CODEX: Ihmisen matka -kertomuksen äänite uusittava (yksi virke pois)

Fable-koordinaatioagentti.

Omistaja (16.9.2026 klo 15.40 UTC, sanatarkasti): *"ota simpukka kommentti pois
kokonaan."* Kertomuksen Arabia-jaksosta (id `arabia`, hiljainen nosto blombos,
90 000 v.) poistettiin virke *"Etelän rannikolla ehdittiin hioa okraa
punaiseksi ja pujotella simpukankuoria helmiksi, ennen kuin ylitys Arabian
niemimaalle onnistui."* Kappale alkaa nyt: *"Sitten kului taas pitkä aika,
ennen kuin ylitys Arabian niemimaalle onnistui. Silloin Arabia oli vihreä: …"*
(`js/linssit/ihmisen-matka-kertomus.js`, haara
`claude/bold-ride-vow4ki-ihmisen-matka-kappaleet`, julkaistaan v1925:ssä).

### Pyyntö: kertomuksen äänite uusiksi tekstin mukaan

- Nykyinen äänite: `aikajana/ihmisen-matka/puhe/ihmisen-matka-kertomus.mp3`
  + manifesti `aikajana/ihmisen-matka/puhe/kertomus-manifesti.json`
  (jakson varareitti `…/ihmisen-matka-kertomus-arabia.mp3`).
- Komento: `node tools/generoi-linssiluennat.mjs --linssi ihmisen-matka --kertomus --yhtena`
  (sama ääni ja asetukset kuin nykyisessä; vain Arabia-jakso muuttuu, jos
  työkalu sallii jaksokohtaisen uusinnan — se säästää maksullista ajoa).
- Peli ei hajoa odotellessa: jaksolla on lippu `aanitePaivitettava: true`,
  ja virkeajoitukset putoavat merkkiosuuksiin.
- Kuittaa tänne uusi SHA/kesto ja manifestin päivitys; Fable poistaa lipun ja
  julkaisee.

Lisäksi tiedoksi: Astronautin kameran musiikki jäi pois (omistajan päätös),
humina kytketty; v1924 julkaisussa.
