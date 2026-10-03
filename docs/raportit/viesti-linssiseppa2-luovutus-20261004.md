# Linssiseppä 2:n luovutus 4.10.2026 (klo 01.3x)

Edellinen: viesti-linssiseppa2-luovutus-20261003.md. Päätoimittaja local_5df52e10-10e4-4b72-9554-0049db300dfe.
VUOROT: käännös- ja simuvuoro aina Julkaisijalta; kuvausskriptit odottavat lupatiedostoa (scratchpad/simu-lupa).

## Juna 135: ajattelijat (proto linssiseppa2/ajattelija-tahti 659c903c) — MERGE-PYYNTÖ Natiivisepällä (4.10. 02.1x)

Omistajan TF 133 -palaute (3.10. 23.4x): iskut eivät ihan osu, savu terävinä varjoina, taustarivit liian sumeita.
- Tahti: kello dspTimesta, äänet PlayScheduledilla, laitteen viive kompensoitu (MatkakirjaAani_Viive). iPad 00008103: kuva − ääni
  5–23 ms kolmella avauksella (loki lokit/linssiseppa2-ipad-tahti-20261004).
- MP3-alkuviive: Unity dekoodaa 2257 näytettä (47 ms) liikaa; ohitus tagista puheelle, musiikille ja kytkimelle.
- Aikajana 1-pohjainen (Linssiseppä 1 + Linnanrakentaja): r = puheen aika · 30 + 1; luvut ennallaan.
- Savu pehmeäksi harsoksi; taustarivit Pelikoodarin #3913:lla + koko- ja kulmarajat (Päätoimittaja).
- Sokrateen hyväksytty kaikuerä (luvut 5b79c21d5, kaiut-v14b ämpärissä) ja kuvalähteet (Pelikoodarin #3916 = sama tavulleen).
- Tallenne äänen kanssa: lokit/linssiseppa2-ajattelija-tallenne-c-20261004/tallenne-aanella.mp4; savuvertailu
  lokit/linssiseppa2-ajattelija-tallenne-b-20261004/merkinnat-savu.png.
- Testit master 137108e2:n päällä: Linssit 604, Kartta 442, Peli 387, tarkista.sh 0. Kuittauksen jälkeen merge-pyyntö Natiivisepälle.

## Muut
- Cupola-veto 4aa02624 siirtyi junaan 135 (Päätoimittaja). Minipallo meni TF 134:ään.
- Muunnin: tools/ajattelija-natiivi.mjs (main), proto muunnin-vaihto 40e450ab.
- Estetty paketti _valmiit/sokrates-kaiut-v14-vienti-20261004 (ALA-VIE.txt) jää yösiivoukselle.

## Päivitys 4.10. klo 02.1x
- Päätoimittaja hyväksyi tallenteen d (tahdistusmerkki: välähdys + piippaus samaan äänikellon hetkeen, adelay-yhdistys) ja kaiut-v14c:n
  stillit (Zeus ja hopliitti ilman jalustaa). Merge-pyyntö 659c903c. Data mainissa Pelikoodarin #3919:llä (sama tavulleen).
- Kehityskonsolin punainen loki (tallenne d) tuli tahdistusmerkin AudioSourcesta kuuntelijan oliossa; korjattu lapsiolioon (c093efe5).
- Marcuksen ääniraidallinen tallenne: ohjeet lähetetty Linssiseppä 1:lle (ajattelija-tallenne.sh LUPA=<oma>, tallenne-yhdista.py,
  spektrivuo.py). Rooli levossa; seuraavaksi TF 135 -palaute.
