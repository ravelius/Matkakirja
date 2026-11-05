# Natiivisepän luovutus 6.11.2026 klo 00.55 (konteksti 30 %, 7.37)

Korvaa -0030:n. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Yötila: omistaja nukkuu, kysymykset PT:lle.

## SEURAAVA TYÖ
1. Liiku 99748962f (PT 00.5x, jonon loppuun, sarjaa hidastamatta): kuvia ei ole lähetetty KK:lle, ja meren vertailu on tekemättä. Kuvat lokit/natiiviseppa-liiku-99748962f (ajettu 5.11. 16.41). Mitä katsotaan: luovutus -1610 kohta 4. Meren ruudukko kanaalilla: vertaa samaan kohtaan iPadin vanhaa kuvaa ennen vastausta KK:lle, ei uutta iPad-ajoa (luovutus -1510). Kuva KK:lle, kopio PT:lle.
2. Vyö: PT 00.5x antoi luvan YHTEEN ajoon (ladatut palat tunnuksineen lokiin, sama paikka kuin c4, 1–2 kuvaa), JU:n vuorolla sarjan jälkeen, ei junaan. Selvitä samalla, mistä 3D-talot ilman palakärkiä tulevat: "kartan omat talot eivät näy alta" on omistajan ehto. Ei korjausta ennen riviä KK:lle. Rivi KK:lle, kopio PT:lle (sama osoite, PT nollautui välissä).
   Ennen ajoa, ilman ajoa (KK: kameran koordinaateilla, ei silmämääräisillä pisteillä): laske kamera H-c4.npy:stä (fov 50°, pääpiste keskellä), piirrä palojen oikeat verkot korkeuksineen c4:n päälle. Pala on Sovita(maaM + MaaLisays), pohja Sovita(90) (TaloKerros.cs:222, Nahtavyysalue.cs:503); korkeusero siirtää kuvassa pisteitä etelään, joten nykyiset kärkipisteet (tasoprojektio) ovat suuntaa antavia. Tarkista myös, osuvatko c1:n vyö ja c3:n suorat reunat palarajoille.

## Tila
- KK 00.4x: c5-2dfb96273 korvaa c3:n aamun kuvissa; kelpaa kokeena, ei junaan. Rajaa ei pehmennetä. Talorintama menee omistajalle aamulla kortilla: älä muuta alueita tai maskeja. KK lisäsi omistajalle kerrottaviin: kaukaisimmat talot pisteinä, heikompana kuin c3:ssa (c2 oikea yläosa).
- KK:lle kerrottu 00.5x: vyön syy ei varma, palan raja paras johtolanka; ajo tulossa.
- Maskit sacre-coeur ja montparnasse jäävät. Maskikoodiin ei koskettu. KS:n kuittaus kumoavaan viestiin on tarkistamatta.

## Vyö ja raja (`_tyo/natiiviseppa/pariisi-talot/selvitys-c5-raja.md`, skriptit `selvitys-c5/`)
Vain kuva c4 on sidottu maastoon (6 pistettä, pahin virhe 11 px).
- Sävy mitattu: pohjan tie 219/199/160 (tiedostossa 235/213/172), striimin 232/202/153. Miksi pohja piirtyy tiedostoaan tummempana: varmistamatta.
- Vyö ei ole maskin eikä aineiston vika: ND-maski vie maskin ulkopuolelta 302 m² / 418 549 m², ja vyön talot ovat OSM:ssä ja palatiedostossa (67–88 kärkeä, 20–23 m).
- Johtolanka, ei todistettu: kaikki palan 15_16597_11273 kärjet ovat vyössä, ja vyön länsireuna on palan raja lon 2,34009. Pala ei näytä piirtyvän. Koodista ei löytynyt syytä, ja lokissa on vain palojen määrä.
- Selittämättä: 3D-taloja kohdassa, jossa palatiedostoissa ei ole kärkiä (rajaus 850,1000 + 190–375, 240–400). Voi kertoa sidonnan virheestä tai toisesta talolähteestä; ratkaise tämä ennen kuin luotat johtolankaan.
- Ilman ajoa voi vielä tutkia: osuvatko c3:n suorat reunat ja c1:n vyö palarajoille.

## Muu auki (kuten -0030)
Kyltit usvassa ilman rakennusta; VS:n kohteet OHJELMA-listaan, kun ovat pelissä; ODbL ennen julkaisua; suorituskyky isossa iPadissa; Ateenan ja Tukholman viat odottavat Pariisia.

## Työtapa
Ajohaara tehdään työpuuta koskematta (-0030). tee-palat.py python3.14:llä ilman -I:tä. Proto-sha:t löytyvät wt/proto-natiiviseppa-marais-työpuusta, eivät tästä reposta. sips -c ei rajaa, jos x = 0. Ei junaan, ei iPadia.
