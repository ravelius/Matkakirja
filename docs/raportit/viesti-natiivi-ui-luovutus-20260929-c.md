# Natiivi-UI:n luovutus 29.9.2026 (ah), nollaus noin klo 21.5x

Jatkaa luovutusta (ag). Päätoimittaja: Opus xhigh. Proto-git: /Users/Shared/Claude/proto-3d/Matkakirja-proto, master
f2b35afb (BUILD 53). Simulaattorit: oma iPhone 17 FB234D08 ja jaettu iPad Pro 11 503000D1, molemmat SAMMUTETTU. Väliaikaiset
17 Pro- ja 18 Pro -simulaattorit on poistettu. Käännös- ja laitevuorot antaa Julkaisija NYT-viestillä. Junat kääntää nyt myös
Natiiviseppä sivuhaaroina (esim. 1.0.55 = fddef63a), ja hän ilmoittaa asennuksesta.

## OMISTAJAN UUDET LINJAUKSET (29.9. ilta)

- NATIIVI ENSIN (Raamattu 47f3bcf3f): natiivi johtaa, eikä webin kanssa tarvitse täsmätä tai odottaa. Pelikoodari tekee
  natiivin UI:ta rinnallasi. Työnjako tiedostoittain (sovittu): MINÄ Ylapalkki, pillerivalikko (Linssivalitsin.Pilleri),
  Paavalikko, Ponnahdus ja avausanimaatiot, Karttaselite/Maakunnat, Nostokortti, Kartuscha, PuluKuvakortti ja Matkakirjakortti.
  PELIKOODARI Lehti/, Sahke/, KysymysNakyma, Aloitusnakyma, Matkavalinta/Liiku ja PuluChat. KortinLukijaan Pelikoodari lisää
  kaksi valinnaista parametria (persoona, aaniRivi) haarassa pelikoodari/pulu-chat. Linssit/-kansion kokonaiset näkymät ovat
  Linssisepän.
- VALIKOT YHTENÄ JÄRJESTELMÄNÄ (omistaja 20.2x, Päätoimittajan malli): yksi pergamentti kaikissa valikoissa (myös Retkikunta
  ja Kehittäjätyökalut, tumma paneeli pois kokonaan). Kolme nappityyppiä 48 pt, raot 12 pt, kulma 10: NAVIGOINTI (kuvake,
  nimi ja ›), KYTKIN (päällä #d9a13b, pois pergamentti ja himmeä teksti) ja TOIMINTO (ohut reunus, ei täyttöä). Pääsivu:
  [Linssit | Aarteet | Matka] → ÄÄNET-kytkimet → [Uusi peli | Retkikunta | Asetukset] → versio. Matka ja Asetukset ovat
  alinäkymiä ‹ Takaisin -paluulla. Otsikot ovat vasemmalla pienin kapiteelein.
- Avaus ja sulku aina animoiden (Ponnahdus, 220/200 ms, napautuskohta origona; kuvasuurennos lentää 320 ms pikkukuvasta).

## TILA

| Haara | Kärki | Missä |
|---|---|---|
| natiivi-ui/palaute-1050 (+avaukset-2) | 0b1f838d | 1.0.54 (ipad-nahkan kautta) |
| natiivi-ui/ipad-nahka | 85be3e3e | 1.0.54 (iPad pillerivalikkoon, nahka turva-alue + 57 pt, tikkaus alareunassa) |
| natiivi-ui/luenta-alku-2 | 207f5d96 | 1.0.55 fddef63a |
| natiivi-ui/valikot-yhtena | 943c8c05 → **25885ed7** | 943c8c05 on 1.0.55:ssä; **25885ed7 seuraavaan junaan** |
| natiivi-ui/asetukset-takaisin | dbec4f0f | sisältyy valikot-yhtenaan |

25885ed7 korjaa 1.0.55-laitekuvan kaksi jäännöstä: pillerin päivärivi ("Päivä 1, aa…" iPhonella; mahtuminen luetaan nyt
asettelusta ja laukkuikoni väistyy) sekä "Äänimai…" kolmen napin rivissä (nimi 11,5 px, kuvake 16). Merge-tree fddef63a:n
päälle on puhdas. VAHVISTA ne kuvasta seuraavan junan jälkeen (iPhone 17 Pro tai 18 Pro: pääsivu ja palkki).

Luenta (omistajan vika "nostojen luenta alkaa ensimmäisen virkkeen puolivälistä"): simulaattorissa se ei toistunut.
Todennäköisin syy on laitteella latautumaton pakattu klippi, jolloin palavirran 1. pala ohittui. 207f5d96 odottaa Loaded-tilan
ennen Play():ta, aloittaa aina näytteestä 0, pysäyttää edellisen puheen heti ja kirjaa lokiin rivit "ALKU EI ALUSSA",
"klippi latautui … ms" ja "ui lukija: aloita pala". Palavirran 1. pala on nyt ≥ 70 mrk (otsikko + 1. virke), ja se
esihaetaan noston avautuessa (Puhe.EsihaeAlku, sulku perii). MITATTU 1.0.55 FB234D08: napautus → ensiääni 33 ms (ennen
3 750–4 470 ms), alku 0,043 s. Päätoimittaja pyysi Laitetestaajaa toistamaan omistajan ohjeen fyysisellä iPadilla.
Lue hänen lokinsa, jos se tulee.

Kuvaparit: proto-3d/lokit/natiivi-ui-palaute-1050/parit/ (1.0.51 | 1.0.54) ja proto-3d/lokit/natiivi-ui-valikot/parit/
(1.0.54 | 1.0.55) on lähetetty omistajalle.

## AUKI / SEURAAVAT

- Seuraavan junan jälkeen: valikot-yhtena 25885ed7:n kuvavahvistus (pilleri, Äänimaisema).
- Linssit/-kansion animoimattomat pinnat Linssisepälle (ei vielä välitetty; inventaario tämän vuoron ali-agentilta):
  MinipulunKortti (hyppy), IhmisenNostokortti (Rakenne.Nayta ilman USS-siirtymää = hyppy), Keksijakaruselli ja vanhan
  Linssivalitsin-paneelin Muut-paneeli (fade 180 ms).
- Webin sisällyslevy hyppää edelleen (Pelikoodari), natiivissa se on animoitu.
- Siivottavaa: Paavalikon Osa.Asetukset-koodi (asetusOmat, offline, huntu, takaisin) on nyt käyttämätöntä, koska Asetukset
  on pillerivalikossa. Poista siivouserässä.
- Worktreet /Users/Shared/Claude/wt/: proto-natiivi-ui-{avaukset-2, palaute-1050, ipad-nahka (checkout
  asetukset-takaisin), luenta-alku-2, valikot}. Poista mergetyt `git worktree remove`:lla, kun haarat ovat masterissa.

## TYÖKALUT

proto-3d/lokit/natiivi-ui-1035/skriptit/:
- p1055.sh <UDID> <nimi> [app]: kaikki valikkonäkymät (boot, asennus ja sammutus, jos app annettu).
- p1050.sh ja p1050-pari.sh: ennen ja jälkeen.
- ipad-vaaka.sh: iPad vaaka + "ui ylapalkki auki". iPadin vaakapalkki on oletuksena piilossa (väkäsnappi).
- luenta-alku.sh <UDID> <nimi> [pois]: kaiuttimen 1. ja 2. napautus ja palaloki.

Testikomennot:
- ui valikko asetukset|matka|retkikunta|kehittaja
- ui pilleri paa|linssit|aarteet [n]
- puhe palat [nollaa]
- puhe virta
- puhe striimi pois|paalle (oletus pois)

## OPIT

- git merge-tree kannattaa ajaa uudelleen juuri ennen käännöspyyntöä. Kaksi haaraa, jotka olivat puhtaita keskenään,
  menivät ristiin, kun toiseen tuli lisäys samaan kohtaan (Ponnahdus.cs).
- Unityn käännös voi kaatua lisenssipalvelun hetkelliseen katkoon ("Access token is unavailable", Cesium/Mathematics puuttuvat).
  Kyse ei ole koodista, uusi yritys riittää.
- UI Toolkitin arvio pillerin tekstistä ei riitä, jos lapsella on oma font-size: lue contentRect asettelusta.
- Bash-työkalun tarkistin voi hetkellisesti hylätä komentoja (no verdict). Tee sillä välin lukutyötä, ja sammuta
  simulaattori heti, kun työkalu palaa.
