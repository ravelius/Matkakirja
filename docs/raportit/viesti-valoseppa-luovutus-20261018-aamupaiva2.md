# Valoseppä – luovutus 18.10.2026 klo 09.3x (Postivahdin KOVA RAJA 39 %)

Luovuttaja: Valoseppä (Opus, high). Edellinen: viesti-valoseppa-luovutus-20261018-aamupaiva.md (562f870d8) – sen kohdat 0 (diag 2), 2 ja 3 ovat yhä voimassa (alla).
Viestit `send_message` TÄYDELLÄ id:llä (osoitekirja /Users/Shared/Claude/osoitekirja.md): PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc (≤ 3 riviä),
JU local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629, LS local_4b4b976c-42b6-4050-9232-dcd14ad3b2a4, LR local_2cf16574-67b6-40c0-928e-68bf36c72db0,
NUI local_e9fdc695-8421-4c14-a187-8881e73c835a, Äänittäjä local_0275bc7a-a851-4f44-91d7-718735f6525b, Postivahti local_63227b57-d045-4b93-ab52-cddc04e3b90f.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2 (päiväkirja $D/JONO.md), L=$D/louvre-pilotti, K=$D/nakyvyys-202.
JU:n sääntö: L2 ja simu vain JU:n "KÄÄNNÖS NYT"/"SIMU NYT" -viestillä, heti "SIMU VAPAA". Ajot irrotettuna:
`nohup perl -MPOSIX -e 'POSIX::setsid(); exec @ARGV' zsh <skripti> ... &`, odotus pid:llä.

## 0. ENSIMMÄISENÄ: LOUVREN PILOTTI (omistajan päätökset 09.04 ja 09.05 PT:n kautta, juna 202, OMISTAJAN ODOTTAMA)
- Haara proto linssiseppa2/louvre-pilotti-202 (worktree /Users/Shared/Claude/wt/proto-linssiseppa2-louvre), kärki d31b23a35:
  4e3148f73 Pulu (Ydin MuseoPuluLento + Unity MuseoPulu, koodikyyhky, penkin pääty, lento, arkuus, napautus → MuseoPulu.Napautettu),
  37b81fed1 kattoikkunoiden päivänvalo (Ydin MuseoKattoikkunat Lambertin kaavalla, MuseoValaistu _MuseoIkkuna*, MuseoPaivanvalo; gg:n ikkunarivi
  dataan Osa.KattoikkunaRivi), 82c454afe MuseoHenkilot (Tripo-mallien lataus, paikat gg k1/k2 + se vartija; kehityslippu POIS),
  a151db5bf merge NUI:n chat-kytkentä (natiivi-ui/museo-pulu-chat-202 27f4c89df), ed7916d1a lasinauhatuki (katto.kattoikkunanauha),
  d31b23a35 Pulu vain gg:n penkeillä (PT 09.4x). Kytkennät MuseoSovitin.Louvre.cs; LS:n tiedostoihin vain koukkurivit (LS kuittasi: ei päällekkäisyyttä).
  QA: `museo paiva [tila|0|1|<kerroin>]`, `museo pulu [tila|0|1|lenna [i]|napauta|ruudulla]`, `museo henkilot [tila|0|1|juuri <url>|kaanto <aste>]`.
  tarkista.sh 0, museotestit 180/180 + uudet (MuseoPulu 4/4, MuseoKattoikkuna 4/4).
- KÄÄNNÖS: JU antoi KÄÄNNÖS NYT; `zsh $L/kaanna.zsh` käynnissä 09.28 (a151db5bf, ei sisällä ed7916d1a/d31b23a35) → app $D/louvre-app, tulos JONO.md:hen
  ("KÄÄNNETTY …" tai "JUMI"). Varjostinta ei ole käännetty vielä kertaakaan: jos JUMI, katso $L/kaanna.out (HLSL Paivanvalo-funktio).
- SIMU (JU ~09.45, yksi vuoro): 1) `zsh $L/aja-louvre.zsh $D/kyyti-diag-app $L/sk-louvre-ennen.txt ennen` (vanha app = ennen), 2) `zsh $L/aja-louvre.zsh
  $D/louvre-app $L/sk-louvre-jalkeen.txt jalkeen`, 3) diag 2 (kohta 1), sitten SIMU VAPAA. Kuvat $L/ennen/, $L/jalkeen/.
- TODISTE PT:lle → KK (omistaja 09.05): jokaisesta salista OIKEA KUVA | PELI -pari. Refe-kuvat $L/refe/{gg1,se1,sc1,...}.jpg (LAHTEET.md, VERTAILU.md).
  Parit: gg1 | j1 (gg pituussuuntaan), se1 | j3 (Mona Lisa), sc1 | j5; lisäksi ennen | jälkeen (e2 | j2 holvi) ja Pulu j6–j9. Tarkista kuvat TÄYSIKOKOISINA.
  PT 09.3x: Pulun lähikuva Pulun 2D-piirroksia vasten (Resources/Raketti/Pulu/*.png) – jos näyttää lelulta, kerro PT:lle (4. Tripo-malli piirroksesta mahdollinen).
- ERO KUVISTA (VERTAILU.md, LR:lle ja PT:lle lähetetty): gg:ssä yhtenäinen lasinauha (data 4 ikkunaa) → LR korjaa sali.json + leivonta heti nykyisen
  pienoismallin jälkeen (PT); se:n keskipenkki pois, kaareva kaide Mona Lisan eteen (LR); gg:n istuimet pyöreät harmaat. Valo seuraa dataa automaattisesti.
- CODEX: tilaus posti/valoseppa-codex-louvre-ihmiset-20261018.md (47beb2a5e, 9 kuvaa), omistajalla TOIMI. Kun vastaus posti/codex-valoseppa-louvre-ihmiset-20261018.md
  tulee: tarkista kuvat täysikokoisina → polut PT:lle → KK ENNEN Tripoa (Tripon osto/kirjautuminen omistajalle vasta kuvien jälkeen). Sitten MuseoHenkilot päälle.
- ÄÄNET (Äänittäjä): ämpärissä aanet/pulu-museo-v1/ (lento 1–4, laskeutuminen, kujerrus 1–3, tuolin narahdus 1–4) – kytke Pulun kuvaparin hyväksynnän jälkeen.

## 1. DIAG 2 -SIMU (sininen maa opas → ISS, juna 202) – kuten edellisen luovutuksen kohta 0
- `zsh $K/aja-diag.zsh --kuvat` (app $D/kyyti-diag-app). Diag 1:n kuvat siirretty $K/diag1/:ksi. Vertaa `grep -a "kyyti-diagnoosi"` iPhone vs iPad.

## 2. JONO
1. Louvre (kohta 0). 2. Diag 2 ja sinisen maan juurisyy. 3. Junaan 202: ISS-kuvan alueen nimi (admin1-fi-eurooppa.json; NE-lataus vain omistajan vahvistuksella omassa ikkunassa).
4. SIIVOUS diag 2:n jälkeen (ei rm): `git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto worktree remove` wt/proto-linssiseppa2-karttaseepia, -kohdevalikko, -louvrepeili.
5. Valas tauolla, V4 pala 4 ei nyt; #4837 odottaa KK:ta.
