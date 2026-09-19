# Opus → Fable: laaja kortti sulkeutui leipätekstin napautuksesta (19.9.2026)

Erä `opus-local-kortti-sulku`, Matkakirja Opus local (Mac Studio), 23.45–00.15 Suomen aikaa.
Pohja `origin/claude/bold-ride-vow4ki-v1968` (0a70be52). Omistaja klo 23.41 (iPad, Chartresin
katedraali LISÄÄ-tilassa): "Nosto sulkeutuu kun leipätekstin kohdalta klikkaa. Johtuu siitä
että peliin ei päivity että lisää sisältöä on tuotu ruudulle. Korjaa".

## Juurisyy (mitattu)

Kortti on kartan kohdekortti (`js/fokuskohteet.js`), joka avautuu kuva edellä
(`js/nostokuva.js`). Kortilla on oma napautusvahti `kuvanNapautus` (kuunteleKohdetta,
12.9.2026): kuva edellä -kortissa napautus mihin tahansa kortin kohtaan, joka ei ole nappi
tai linkki, sulkee kortin. Ehto luki vain luokkaa `nostokuva-kortti`, joka jää korttiin myös
Lisää-napautuksen jälkeen. Kun juttu on ladottu kuvan ympärille (vaihe 2,
`nostokuva-vaihe2`), kortti on tavallinen luettava kortti — mutta vahti sulki sen yhä
leipätekstin, kuvatekstin ja lähderivin napautuksesta. Omistajan kuvaus osuu: kortin
kasvamista ei päivitetty sulkulogiikkaan.

Kortin ulkopuolinen sulku ja ✕ toimivat ennallaan. Täkynoston ja eläinkortin kerrokset
lukevat osuman DOM-sisältävyydellä (`closest('.fokusnosto-kortti')` /
`.elaintaky-kortti`), joten niissä samaa vikaa ei ole.

## Korjaus

`js/fokuskohteet.js`: `kuvanNapautus`-vahdin ehtoon lisättiin
`&& !popup.classList.contains('nostokuva-vaihe2')`. Vaiheessa 1 (pelkkä kuva) käytös on
entinen; vaiheessa 2 kortin päällä napautus ei tee mitään, ja sulku on ✕ tai napautus
kortin ulkopuolelle.

## Vartio

Uusi `tools/savukkeet/savuke-kortti-sulku.mjs` (lisätty julkaisusarjaan). Chartres →
Lisää → kolme mittausta kahdella ruudulla (390 × 844 ja iPad 1024 × 1366, kosketus):

1. napautus leipätekstiin → kortti auki
2. napautus kortin ulkopuolelle → kortti kiinni
3. ✕ → kortti kiinni

| Ajo | Tulos |
| --- | --- |
| Vastakoe (vanha koodi) | **6/8**: leipätekstin napautus sulki kortin molemmilla ruuduilla |
| Korjattu | **8/8** |

`node --test tests/*.test.mjs`: pass 3709, fail 0. `tarkista-savukkeet`: kunnossa.

## Havainto mittaustavasta (kirjattu, ei vika pelissä)

Laaja kortti jättää ulkopuolelle vain 4–12 px:n reunan. Chromiumin kosketuksen
kohteenkorjaus (touch adjustment) siirtää niin lähelle korttia osuvan KOSKETUKSEN korttiin,
vaikka `elementFromPoint` näyttää karttaa. Siksi savuke mittaa ulkopuolisen napautuksen
tarkalla osoittimella (hiiri) ja kortin sisäiset napautukset kosketuksella. Sama ilmiö
selittää, miksi vanhalla koodilla "ulkopuolinen" napautus näytti sulkevan kortin: se osui
korttiin ja sulkeutui kortin omasta vahdista.

## Jäi tekemättä

- Laitemittaus (iPad). Korjaus on luokkaehto, joten sen voi todentaa julkaisun jälkeen
  samasta Chartres-kortista.
- Muita kuva edellä -kortin pintoja (täkynosto, eläinkortti) en muuttanut: ne lukevat
  osuman DOM-sisältävyydellä jo nyt.
