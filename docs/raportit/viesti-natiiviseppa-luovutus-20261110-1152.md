# Natiivisepän luovutus 10.11.2026 klo 11.52

Edellinen: -1105 (dfe8ddee5), käsitelty kokonaan. Syy: kontekstivahti 25 % (7.37). Kansio Matkakirja-3d-selvittaja. Älä poista mitään.
Työkansio /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/, lokit /Users/Shared/Claude/proto-3d/lokit/. Repo proto-3d/Matkakirja-proto, remote natiivi-backup.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (/opt/homebrew/bin/python3.14 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py
ILMAN -I:tä; UUSI-rivit → PT "UNITY UUSI: …"). Työlista: PT kirjoittaa. Vahti: pidä Monitor JU:n ajoille (Mac loki.txt "valmis N s", iPad konsoli.txt hiljaa > 60 s).
PT 12.0x: jatka kertojan viiveellä ja ISS-kello/kupoli-iPad-parilla.

## 1. YKSI TARKKUUS a2 (wt /Users/Shared/Claude/wt/proto-natiiviseppa-yksitarkkuus, natiiviseppa/yksi-tarkkuus a4fd9ad6b)
- (a) ei aktivoitunut: liikevalinta (LiikeLaatat.Sse) on oletuksena pois → eleessä piirsi pääkameran oma valinta. a2: `maasto yksitaso liike <k>` pitää
  yksi tason kiinni koko liikkeen ajan (k 1 = sama kuin levossa, 0,5 = taso karkeampi).
- a2-1 LUETTU: hyppy 759/83 → 442/12 (PT:lle 12.1x, parit-a2/). a2-05 JU:lla → lokit/natiiviseppa-yksi-tarkkuus-mac-a2-05 (yc-ele).
  KUN VALMIS: *-ele.mp4 voi olla rikki (moov puuttuu) → aja mittari ruutukuvista: ffmpeg -framerate 50 -i yc-ele/k-%06d.jpg -vf scale=320:240
  -c:v libx264 -crf 10 <scratch>.mp4 ja hyppy.py sille (verrokit samalla tavalla: a 759/83, a2-1 442/12). Kärkiruudut → pari PT:lle.
  Sitten iPad-muisti k=1 ja 0,5 (iPad-skenaario sk-mac-a2-*:sta, odota 3 komentojen väliin; > 4080 hylätään, ellei muistiosuus-kortti nosta 6553:een). Ei junaan.
## 2. ISS iPad (tärinä + kupoli) – JU:lla (OS), alkaa junan MR6-linkin jälkeen
- natiivi-backup natiiviseppa/iss-kello 941dd597f (wt /Users/Shared/Claude/wt/proto-natiiviseppa-iss): af969f31a kehyskello + kupolin FSR (suojaprofiilissa
  upscalingFilter FSR, terävyys 0,8, renderScale pysyy 0,8; QA `lampo suodin fsr|pois|aina`). Mac-tärinä: reaali 1457 → kehys 2/2250 (iss-tarina/tulos.md).
- iss-tarina/ajopyynto-3.md → lokit/natiiviseppa-iss-ipad-1. Ei videota (JU). KUN VALMIS: konsoli "kello tasaisuus (reaali|kehys)" (kehys: lennon askel − kehys ≈ 0?),
  kuvat kupoli-{ennen,jalkeen,taysi} täysikoossa samasta rajauksesta + kehysajat gpuMs kummassakin 60 s jaksossa + muistivahti-huippu → pari PT:lle. Ei junaan ilman paria.
- Mac-kupolikuvat katsottu: suoja08 ≈ normaali (Mac ei kelpaa tähän; pelin ruutu 321×531).
## 3. KERTOJAN VIIVE – mittaus JU:lla (lokit/natiiviseppa-kertoja-viive-1, käännös 8fd6cf441)
- Syyehdokkaat ja lukuohje kertoja-viive/tulos.md, poiminta: python3 -I kertoja-viive/lue.py <konsoli.txt>. Erottelu: "puhe: alkoi X ms (verkko|välimuisti)",
  "valmis kappale", "ulostulo seisoi". Kerro syy PT:lle (≤ 3 riviä).
## 4. PdG-esilataus 44b7cbd17 – JU:lla (pontdugard/ajopyynto-2.md → lokit/natiiviseppa-pdg-{ennen,jalkeen}-{1,2}); ohje edellisessä luovutuksessa (-1105 kohta 1).
## 5. VALMIIT TÄLLÄ VUOROLLA
- Muistiosuus efdb68d93: 2× kylmä, huippu 3530/4096, ei varoituksia/kaatumista → PT (muistiosuus/tulos.md); kortti KK:lla, junaan vasta sen jälkeen.
- ISS C 630e6bc31: huippu 4172 (B 4397), ei kaatunut, UrpLiitteet vain 33 Mt (iss-muisti/tulos-c-630e6bc31.md). PT 12.0x: S2 SEIS, C odottaa korttia.
- ISS-kupoli Mac-kuvat katsottu (iss-tarina/tulos.md). Ennallaan: muistikatto 3+3 (jaksot.py) JU:lla.

## VIESTIT TÄLLÄ VUOROLLA
PT: a 11.10, tärinä+kupoli 11.5x, muistiosuus 11.5x, ISS C 12.0x, a2-1 12.1x (kaikki kuitattu/toimitettu). JU: ajopyyntö-5 (OP kuitattu), iss ajopyyntö-3 (OS kuitattu).

## PT 12.1x (luovutuksen jälkeen)
a2-1 pari katsottu ja hyväksytty (sama tyyli, vain tarkentuminen). Jatka a2-05 → iPad-muisti; jos muisti < 4080 (tai osuusrajan alla, jos muistiosuus-kortti menee) → pari + luvut PT:lle → KK:n kortti.
