# Julkaisija: luovutus 7.11.2026 klo 00.11 (konteksti noin 33 %)

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt. Korvaa aiemmat luovutukset. Id:t: /Users/Shared/Claude/osoitekirja.md.

## ALOITA TÄSTÄ: jono pyörii irrotettuna, viritä odotin, älä käynnistä uudelleen
Tarkista `ps -p` ja jonolokin häntä; osa on voinut jo päättyä, ja tulos on silloin kuittaamatta.
- L2: PK Lontoo D1 200433217, pid 93288, tulos T/pk-lontoo-d1.tulos, 7 kuvaa, lokit/pelikoodari-lontoo-d1-200433217. Kuittaus Pelikoodarille.
- L1 järjestyksessä, kukin odottaa edellistä pid:llä:
  1. LAV levyt7z valmis 00.10, kuitattu.
  2. LAV levyt7m, pid 83727, tulos T/lav-levyt7m.tulos, 6 kuvaa, kuvat-levyt7m. Kuittaukset LAV:lle: kuvat, 404-määrä (nyt 4, samat kuin levyt7v), virheet.
  3. NS karsi d7a8b8af0, pid 87519, tulos T/ns-karsi.tulos, 7 kuvaa, lokit/natiiviseppa-karsi-d7a8b8af0. Kuittaus NS:lle rivillä.
  4. NUI neljä ajoa 6d12054b0, pid 95425 (odottaa pid:t 41366, 87519, 93288: PT:n käsky Pariisin ja Lontoon jälkeen), tulos T/nui-yksi.tulos, kansiot lokit/nui-yksi-k01f, -k05, -k04, -nimi-tallenne. Kuittaa NUI:lle kansiot ja paketti-rivi.
- Kaikki valmiit, jonossa ei muuta: rivi PT:lle "JONO TYHJÄ: Julkaisija".

## YÖN SÄÄNNÖT
- Omistaja 23.22: yöllä vain Pariisi, Lontoo ja juoksupeli. PT: Kielletty kaupunki ON juoksupeli (LAV:n levyt kuuluvat). Jos jonoon tulee muuta, ei ajoa, rivi PT:lle.
- KK 23.15: enintään 2 Unityä yhtä aikaa koko yön. T/ju-portti.zsh (`source`, `portti <linja>`) tekee tämän; käytä sitä kaikissa uusissa ajoskripteissä. Portti pitää /tmp/ju-portti.lukko 60 s:n ajan, joten seuraava ajo alkaa noin minuutin viiveellä. Pid 56994 portissa on PK:n päättynyt planeetta-ajo: ei estä.
- Vika ei ratkea kahdella yrityksellä tai noin 30 minuutissa: kokeen osa pois tai edellinen toimiva tilalle, rivi KK:lle, seuraavaan työhön (omistaja 23.07).
- Levy: rivi PT:lle alle 35 Gi; nyt 52 Gi. Notkahdukset (14 Gi 23.14) olivat vaihtotilaa, kun Unityjä oli enemmän, ei tiedostoja. Älä poista lokit/-kansiosta ilman PT:n nimeämistä. T7-siirto tehty 23.17.
- TF ei lähde ennen KK:n korttia "Pariisi valmis" PT:n kautta.

## INTRO: LAATTAPAKETTI (PT 23.5x, muisti intro-mac-ajot-laattapaketilla)
Intron Mac-ajot omistajalle laattapaketin kanssa. Paketti on koodissa, ei asetus. Ennen ajoa `git grep julkaisija-laite-218 <sha> -- Assets/Matkakirja/Kartta/Laattapalvelin.cs` (NUI poimii muutoksen, joten is-ancestor 7b6caba3a antaa väärän hälytyksen). Ajon jälkeen lokista "laattapalvelin: paketti". ÄLÄ siirrä tai siivoa lokit/julkaisija-laite-218-2cba21a3e: paketti luetaan sieltä.

## TILA
- iPad vapaa, runko d092f48c palautettu 23.43. Tallenne ei onnistu, kun konsolikäyttäjä on samireivinen (oli 23.40).
- Junarunko kuten edellisessä luovutuksessa: julkaisija/runko-219-muisti 1104d0994 natiivi-backupissa, ei käännetty junakäännöksenä.
- Odottimen malli: scratchpad ei säily; kirjoita uusi zsh-silmukka, joka tulostaa rivin, kun T/*.tulos kasvaa tai jonon pid päättyy, Monitorilla raja 30 min.

## TULOKSET TÄLTÄ VUOROLTA (kaikki kuitattu tilaajille; kuvia en arvioinut)
KS 35, 36, 37. NS tyhjat b-j, liiku-pitka, liiku-ehdokkaat, liiku-nappi, -nappi2, aloitus-paketti g, iPad kylmä 2cba21a3e. NUI nimirivi, -2, kk-2, kk-paketti 8ac8d2a70. PK Lontoo B1, B2. LAV levyt7v, 7s, 7r, 7u, 7p, 7k, 7z.

## OPIT
- Odottavan ajon vaihto: tarkista samassa komennossa, että skriptin lapsi on `sleep`, kill vain se pid, käynnistä uusi tiedosto. Älä muokkaa ajossa olevaa skriptiä. Pidä myös seuraava odottaja mielessä: sen pid-riippuvuus pitää vaihtaa samalla.
- Ketjun keskellä: emon voi tappaa ajon aikana, lapsi jatkaa, uusi ketju odottaa lapsen pid:tä ja tekee jälkityön (T/l1-ketju-2325.zsh). `pgrep -P | head -1` voi antaa portin taustasubshellin, käy lapset läpi.
- iPad kylmä lippu kuluu ensimmäisessä käynnistyksessä: esikäynnistys ensin, lippu vasta sitten (T/ns-ipad-kylma2-ajo.zsh).
- Tulosrivin "kaatui 1" iPad-ajossa on oma lopetus (signal 15), ei kaatuminen; lue rivi ennen kuin nimeät sen.
- Rajaus: kysy PT:ltä ennen kuin poistat ajon rajauksen perusteella, jos kuuluminen ei ole varma. Poistin LAV:n levyt turhaan 23.25 (palautettu samalla minuutilla).
