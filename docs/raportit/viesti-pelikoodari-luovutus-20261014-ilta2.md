# Pelikoodarin luovutus 14.10.2026 ilta 2 (nollaus, PT: konteksti 55 %)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari, proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto
(haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, push remoteen natiivi-backup). Edellinen luovutus
viesti-pelikoodari-luovutus-20261014-ilta.md (kaikki sen kohdat hoidettu, ks. alla).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. Osoitekirja /Users/Shared/Claude/osoitekirja.md: viestit AINA `send_message`
  session id:llä. PT local_74630a27-8c1b-4ac3-9143-538efab8cbcd (≤ 3 riviä), Julkaisija local_22b29f10… (KÄÄNNÖS/SIMU NYT, ilmoita
  LUKKO VAPAA / SIMU VAPAA), NS local_bf20055b…, NUI local_33ba1387…, Valoseppä local_fc4fcc54…, Äänittäjä local_846757a4….
- Simut T7-sarjassa: `source /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh`. pelikoodari-iPad13 39644E75-8BDA-4ED8-98B1-3FC864B73697,
  pelikoodari-iPhone 3E6A1D4D-9B21-4296-ADB7-24FF25267E15. Jokainen ajo mykistettynä.
- ÄÄNELLINEN TODISTE PELIN OMALLA ÄÄNIRAIDALLA (PT 14.10.: "ei jälkimiksausta"): linssi `kaappaa <s> tallenne` (AudioListenerin miksaus
  WAViin, kaiuttimet nollattu) + kaksi `merkki`-komentoa; yhdistys `python3 proto-3d/tyokalut/siirtoseppa-ajot/tallenne-yhdista.py <kansio> 2`
  (kansiossa tallenne.mov + tallenne.wav). Natiivimoottorin tallenne-natiivi.wav kohdistetaan samoista piippauksista (ks. pk-maxq3 ajo2).
  Malli: _tyo/pelikoodari/iss-palaute/ajo-maxq-kaappaus.sh (oma skripti) ja _tyo/pelikoodari/museo-aanet/ajo.sh (todistusajo --jata-paalle).

## Tässä vuorossa valmiit (junan 190 ehdot; museo ja Lontoo 191 NS:llä yhdistettävänä)

AVOIMIA EI OLE: jono tyhjä luovutushetkellä (14.10. 21.1x).
- Raketti näkyvissä koko lennon: 34d42eb4d + juna-yhdistys 1ff6c9298 (212/212 mittausta). Tarkistus _tyo/pelikoodari/iss-palaute/
  tarkista-nakyvissa.py (0,5 s välein, suurennos raketin kohdalta). Irtoamisen tumma siluetti Valosepän jonossa.
- ISS-palaute 7–9: 19652ed2c + NUI db8e7b193 (PT kuittasi).
- Isoisän Kolme veljestä eleven_v3: 669d945c9 (aloitusaarre v4). Luenta soi Livian aloituspolussa; kortin kaiutin on Kertoja-kytkin.
- Max Q kolmiosainen: 1a285edad (vonkuna päättyy iskuun Pulun repliikin perään, tärinä rampit, ducking 0,3). Runko 8fc5e51f9.

## Taidemuseon äänet – KUITATTU (PT 21.1x) ja annettu NS:lle junaan 190: pelikoodari/museo-aanet-190 @ 97fbe1638 (worktree wt/proto-pelikoodari-museo)
- PT:n lopullinen linja (19.57): parketin askeleet salikaiulla kaikkialla (yksi sarja) + sello-soittolista adagio + moderato + 3 uutta.
- Tehty: aanet/taidemuseo-askeleet-v1/askel-parketti-sali.mp3 (PK: Soundly SND81682 + esimerkin Aalto OK5 -kaiku, 22,1 s, −32,6 LUFS,
  ääniportti 0/0, viety vie-paketti.sh:lla; skripti _tyo/pelikoodari/museo-aanet/parketti-sali.py). MuseoAskeleet soittaa liu'ussa pätkän
  satunnaisen askeleen kohdalta (28 mitattua alkua). AaniTaulut.Museo = 5 kappaleen soittolista (Äänittäjän museo-sello-soittolista-v1);
  MuseoSovitin LinssiMusiikki("museo") salin auetessa, sulku lopettaa. Parkettikävelyn taso 0,9 (97fbe1638: 1. ajossa 0,45 → askeleet
  vain 3–5 dB sellon yli). Peli 586/586, tarkista.sh 0. Käännös ceda1544b (sisältää 97fbe1638).
- TODISTE lähetetty PT:lle 21.0x: proto-3d/lokit/todistus-museoaanet-iphone-20261014-2052/museo-pelin-aanella.mp4 (pelin oma ääniraita,
  askeleet 8–12 dB sellon yli, tahdistus 0 ms; TULOS-AANET.md). Kuvassa näyttelyvalintasivu jäi salin päälle (skenaario
  _tyo/pelikoodari/museo-aanet/sk-museo-aanet.txt ei valitse näyttelyä: lisää esim. `linssi museo nayttely m1` kuten NUI:n sk-salit2.txt)
  → uusinta, jos PT haluaa kuvan ennen kuittausta. Ajo: `zsh _tyo/pelikoodari/museo-aanet/ajo.sh <app-kansio>` + tallenne-yhdista.py.
- Worktreet museo ja lontoo poistetaan, kun NS on yhdistänyt (git worktree remove proto-reposta).

## Lontoo 191 – KUITATTU (PT 20.5x) ja annettu NS:lle junaan 191: pelikoodari/lontoo-191 @ 7333b589e (worktree wt/proto-pelikoodari-lontoo)
- Valosepän lontoo-korkeus-v2 3d033895a (luovutettu PK:lle 14.10. 19.4x: Lontoo kehityskaupungiksi, 10 km vesi index-v23 + puut v2,
  pintamalli v2, pallokierros v5) + juna-190 8fc5e51f9 (ristiriidat Pallokierros.Versiot lontoo + ateena). Linssit 1791/1791, tarkista 0.
- "Nosto pelaajille" (PT): Lontoo Kehityskaupungit-listassa → pallo ja kierros myös ilman kehittäjätilaa (KaupunkiPalloMitat.Mukana). Ei introa.
- NS:n muistiajo iPad Pro 13: fyysinen huippu 4365 vs 4381 Mt (−16), mono 455 vs 439 Mt; kuvapari ja Tower Bridgen kummut (jo juna-190:ssä,
  Valosepän jonoon PT:n kautta) proto-3d/lokit/pk-lontoo-191-20261014/. Worktree lontoo poistetaan, kun NS on yhdistänyt.
- Valosepän avoimet tarkistettu: Trafalgar 15,5 s = laattojen odotus kuormitetulla simulla (NAS valoseppa-auto-1014-1729), ei muutosta;
  Westminsterin katko ei toistunut. Vesi-indeksi v24 on varattu Prahan vesi v3:lle (KS).

## Muut
- Proto-worktreet: isspalaute, kupoli (iss-kupoli-190, ei junaan), museo, lontoo. isspalaute voi poistaa (19652ed2c rungossa).
