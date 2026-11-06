# Lavastajan luovutus 7.11.2026 01.49 — LUE KOKONAAN, riittää yksin (korvaa -0122)

A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md, loppu. Luovutus kontekstirajan takia (25 %), uusi työ aloittamatta. Yön sääntö: 2 yritystä tai 30 min per kohta, sitten rivi KK:lle ja seuraava.

## TEE ENSIN: PT 02.0x (sanatarkasti)
"uusi työ, korvaa lepomääräyksen (juoksupeli, koejuuressa, lod0, ei leivontaa, karttaa eikä vientiä): 1. Kiven alareunan rako: selvitä säde rako10:stä ja kokeile sääntöä, jossa kivireunuksen sivu ulottuu lattiaan; tavoite: vaalea kaista poissa eikä uutta näy; parit rako 1, 4, 10 cm samoista kameroista, koko peli-kuvat vertailuksi. Sävyrajaa ei kosketa; pyöristys pois omista kärjistäsi. 2. Jos yhä aikaa: irtolaatta (259; -80,9) ja kivijalan sahalaita ja venynyt kansi: mittaa alkuperä, korjaa vain jos lod0:lla pieni. Seinän lovi sivu-259:ssä sama. Kaksi yritystä tai 30 min per kohta, sitten rivi KK:lle ja seuraava. Vuoro JU:lta; rivi PT:lle. 'JONO TYHJÄ' kun nämä tehty."

## Lähtökohdat kohtaan 1
- Säde rako10:stä SELVITETTY (mittaa57.py): tausta-lod0:ssa raon takana ei ole mitään; ainoa osuma kaikissa neljässä on lod1/lod2:n V4_lattia y 0. Vaalea kaista on hypoteesina lod1/2:n lattia raon läpi; ei kuvatodistusta.
- OIKAISU: aiempi -0122:n väite "glb:ssä z käännetty" ja "V4_lattia kiven takana" oli väärin (peilikuva, mittaa56). lue_p antaa maailman z:n; älä käännä. PT:lle lähetetty.
- Sääntö: V4_kivireunus-pystypintojen alareunan kärjet alas lattiaan; A/alareunat.npy (mittaa51) antaa x, z, nx, nz, y-ala, lattia. Varo: alareuna vino tai yli 0,05 m:n ero suljettu pois mittaa51:ssä; "ei lattiaa alla" 2 853 pintaa; venytä UV ei saa tuoda juovaa. Tee uusi koejuuri 7n:n päälle (malli tee_levyt7n.py, symlinkit + kopioidut palat), EI 7o:n; sävyrajaa ei kosketa.
- Kuvat: A/sk-levyt7o.txt mallina, juuri uusi; kamerat ala-tama-kivi, ala-rako0, ala-rako1, ala-rako4, ala-rako10, lisäksi koko peli-kuvat (peli-A, peli-B, peli-0-2-kauempaa: kamerat sk-levyt7n.txt). Vertailu 7n:n kuvat: ala-* ajossa 7y, koejuuri 7k, jossa kivet samat. Sha 35140432d, vuoro JU:lta (aja-levyt7o.zsh mallina).
- Kärjet maailman tarkoilla arvoilla, ei pyöristyksiä (7o:n virhe, 3-5 mm).

## Kohta 2 lähtökohdat
Irtolaatta tausta 3-1, V4_kivireunus, y 0,08, (259; -80,9). Sahalaita: kaista-lahella-kuva, vasen ulkomuuri. Venynyt kansi: A-reunakivi-kuva, peli-A:n seinä. Lovi: sivu-259 (kuvat-levyt7x), noin 680-760; 490, kamera -228.98 1.1 -259 90 40 80. Säteet: sade() mittaa38:ssa, maailma A/maailma-7k.npz + .json, osasarja-v8-z.npy.

## Kuitattu, älä avaa
7n koejuurena, pääty ehjä kulma, 1-1 nähty kokeena. Sävyraja aamuun (tarkat kärjet + valo-UV KK:n koeleivonnalla, 7o:n yritys pari kuvat-levyt7o/pari-*.png). Koko muuria EI saa sanoa korjatuksi: lod1/2, kolo, laikku auki. numpy/scipy: /opt/homebrew/bin/python3 ilman -I:tä.
