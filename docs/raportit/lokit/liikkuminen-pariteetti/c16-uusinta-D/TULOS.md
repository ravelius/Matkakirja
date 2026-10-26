# C16 + C10 + C12: B-ajo uudelleen oikealla nollauksella (Pelikoodari 25.9.2026 klo 15.5x)

Käännös 2fe4375a = master 168fe238 + juna/b13 ee886e6d + natiivi-ui/paljastus-c16b 30db4207 (käännöspalvelu 15.48),
pariteetti-iPhone A2FD9C9F. Skripti `c16-uusinta.sh` (tässä kansiossa; C-kansiossa sama ilman tekstien pakotusta).

Nollaus: `ui livia paljastus nollaa` → `ui livia paljastus` = "näkemättä" (ui-loki.txt 15.52.10–11).
iPhonella pulun tekstit ovat piilossa (Pulu.TekstitPiilossa = Ylapalkki.Puhelin, kuplat vain äänenä; simctl-video
ei tallenna ääntä), joten tässä ajossa `ui pulu tekstit nakyviin`. Ajo C (../c16-uusinta-C/) ilman pakotusta: sama
tilasarja ja ajoitus, kuplat eivät näy kuvassa (kuten webissä puhelimella).

Tulos videolta (natiivi-c16-D-iphone.mp4, 1 fps -arkit):
- C16 OK: välikortti "ATEENA · PÄIVÄ 1/80" (20–21 s) → kartta → kupla 1 "Kääk, apua! Pöllö on matkoilla…" (24–30 s)
  → kupla 2 "Tervetuloa Ateenaan. Kuunnellaan, mitä isoisä on kirjoittanut tästä paikasta." (31–37 s) → vasta sitten
  isoisän luenta (38 s, puhe-fokus-matkakirja-ateena.mp3 30,9 s; konsolissa AloitaLykattyLuenta ← LivianPaljastus.OdotaLuenta).
  Tila: näkemättä → kesken → nähty, kesken → nähty (luennan ja kommentin jälkeen).
- C12 OK: luento loppuu (peli-tila k33 aika 30,8 → k34 soi=false) → pulun kommentti "Schliemannin talo on nyt
  rahamuseo…" (video 70 s). 1 fps:n erottelu ei riitä 900 ms:n mittaukseen; koodissa SE.Loppui 900 ms (C12-korjaus).
- C10 OK: PuluCam-kuva "Ateena: kultaa sisällä, hyvä varjo puutarhassa." ilmestyy samassa ruudussa kommentin kanssa (0 ms).
Arkit: arkki-20-47s-paljastus-luenta.png, arkki-48-75s-kommentti-pulucam.png; kuvat/ui-c11…c13 (kupla 1), c34–35 (C10+C12).

Muuta näkyvää (ei tämän erän asia): lennon alapalkki "Kone nousee…" jää ruutuun koko ajon ajaksi (Natiivi-UI 81/83).
Edellisten A/B-ajojen (c16-uusinta, c16-uusinta-B) virhe: nollaus `ui paljastus nollaa` on no-op, PlayerPrefs-lippu jäi 1:ksi.
