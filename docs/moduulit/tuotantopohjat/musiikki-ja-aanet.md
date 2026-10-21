# Tuotantopohja: musiikki ja äänet (musiikki, tehosteet, äänimaisemat)

*(LUONNOS 21.10.2026, Äänittäjä, PT:n toimeksianto (omistaja 17.31: "yksinkertaisia tuotantoputkia joista kaikki asiat tarkastetaan ennenkuin tehdään tai kysytään minulta"). Tähän on koottu vain voimassa olevat Raamatun kohdat ja Äänittäjän luovutusten opit; uusia sääntöjä ei ole. Jos tämä ja Raamattu ovat ristiriidassa, Raamattu voittaa. Pohjan omistaa Äänittäjä, PT hyväksyy muutokset. Kertojan ja hahmojen puhe: `kertojan-teksti-ja-aani.md`.)*

**Tavoitteen muoto (Raamattu 4.21, omistaja 19.10.2026 klo 15.32):** ennen työtä tavoite määritellään yhtä selvästi kuin grafiikassa havainnekuvalla. Tässä putkessa: MUSIIKKI mallinäyte (Lyria-näyte tai viitekappale) ja yksi lause siitä, miltä pitää kuulostaa (soitin, tunnelma, tempo, käyttöpaikka); TEHOSTE kuvaus yhdellä virkkeellä, mitä ääni esittää, ja missä pelitapahtumassa se soi; ÄÄNIMAISEMA paikka ja salin tai alueen koko. Gemini kuvaa valmiin äänen sokkona ja kuvaus verrataan tavoitteeseen (Raamattu 5.27, 9.11). Omistajalle tuodaan vain uudet asiat ja makuvalinnat.

## Tarkista ennen (AINA ennen kuin teet tai kysyt omistajalta)

- **5.1 generointi:** AINA: uusi ääni (puhe, tekoälyääni, musiikki) vain omistajan luvalla; ElevenLabs hyväksytyllä äänellä ilman lupaa vain kun ajon kulutus on alle 3 % kuukauden krediiteistä (raja on ajokohtainen), uusi henkilö tai ääni AINA luvalla. EI: generointia ilman lupaa; EI: lupa tilalla "idea hyväksyttiin".
- **5.2 määrä:** AINA: lupapyynnössä tarkka ottomäärä ja merkkimäärä (tagit mukaan), lupa KK:n kautta. EI: uusintaa omin päin; uusinta on uusi otto ja uusi lupa, vaikka merkkejä jäisi; EI: erän kasvattamista.
- **5.15 musiikki:** AINA: uusi musiikki Lyria 3.5:llä, jokainen kutsu omalla luvallaan. EI: ElevenLabs Music; EI: Sonniss, Freesound, Soundly tai muu valmis kappale musiikiksi ilman omistajan erillistä lupaa (poikkeus: Olavinlinnan loppumusiikki The Bard's Tale, CC0).
- **5.16 kehote:** AINA: lyhyt, pelkästään myönteinen kuvaus (2–3 soitinta, keveä, harva); huomioi, että Lyria ei noudata täysin kestoa (noin 60 s), tarkkaa tempoa eikä soitinrajausta. EI: kieltoja kehotteessa ("ei säröä", "ei rumpuja"); EI: sävelkorkeuden siirtoa eikä asetratea generoituun musiikkiin (väärä soitin = uusi otto luvalla tai hylkäys).
- **5.20 / 5.27 tehosteet:** AINA: Soundly Pro ja Sonniss ensin (ensisijainen lähde kysymättä), valmiita yksittäisiä tehosteita; sokko-Gemini kuvaa jokaisen ennen peliä. EI: Freesoundia ensin (vain aukkoihin, alkuperäisinä tiedostoina, ei esikuuntelu-mp3:ina); EI: pitkistä nauhoitteista koneella leikattuja paloja; EI: raakatiedostoja ämpäriin (NAS:lle, ämpäriin vain käsitellyt).
- **Ennen kysymystä omistajalle:** onko jo päätetty (`grep -ri "<aihe>" docs/raamattu-loki`), noudattaako ehdotus tätä pohjaa ja Raamattua, ja yksi suositus ensin. Kysymys vain KK:lle viestinä (7.27); tekstit eivät korteille.

## 1. Tuotantoputki ja roolit

```
tavoite (mallinäyte + kuvaus)
  → kehote ja ottomäärä (Äänittäjä)
  → lupa KK:n kautta (musiikki ja kaikki generointi); tehosteet kirjastosta: ei lupaa, jos vapaa tai Soundly/Sonniss
  → generointi tai haku (raaka talteen heti, 5.13)
  → Gemini sokkona + ääniportti + LUFS
  → ämpäri (vie-paketti.sh, uusi polku) + manifest + LAHTEET
  → kytkentä (Pelikoodari / Linssiseppä / kytkijä) + ilmoitus Äänittäjälle
  → retrospektiivi tämän pohjan opit-osioon
```

| Vaihe | Rooli | Tulos |
|---|---|---|
| 0. Tarkista ennen | Äänittäjä | Yllä oleva lista käyty; onko päätetty jo (grep) |
| 1. Tavoite | PT / tilaaja + Äänittäjä | Mallinäyte tai kuvaus, käyttöpaikka, kesto |
| 2. Kehote ja ottomäärä | Äänittäjä | Lyria-kehote (myönteinen, lyhyt) tai hakusanat; tarkka ottomäärä |
| 3. Lupa | PT → KK → omistaja | "OMISTAJAN PÄÄTÖS klo …" -rivi; kutsu vasta sen jälkeen |
| 4. Otto tai haku | Äänittäjä | Raaka talteen; ehdokkaat tiedostoina |
| 5. Tarkistus | Äänittäjä | Gemini-sokkokuvaus vs. tavoite; portti; LUFS |
| 6. Vienti | Äänittäjä | Ämpäri uudelle polulle, LAHTEET (lisenssi), manifest, SHA256SUMS |
| 7. Kytkentä | Kytkijä | Pelissä; Äänittäjä saa kuittauksen |
| 8. Retrospektiivi | Äänittäjä | Rivi opit-osioon |

## 2. Kultainen polku

1. **Päätetty jo?** `grep` Raamatun lokista ja luovutuksista; käytä olemassa olevaa ääntä, jos sellainen on (ämpärin manifesti, äänipankki).
2. **Musiikki:** kirjoita yksi lyhyt myönteinen kehote (soittimet, tunnelma, tempo sanallisesti, paikka), ilmoita ottomäärä ja kesto (Lyria ~60 s); lähetä PT:lle → KK. Kutsu (`tools/lyria.mjs`) vasta luvan jälkeen, täsmälleen luvan ottomäärä. Mallinäyte ennen koko erää.
3. **Tehoste:** hae Soundly/Sonnissista (NAS:n Soundly-originaalit, `hae.py` Sonnissiin); valitse valmis yksittäinen ääni. Freesoundin CC0 vain aukkoihin ja alkuperäisenä. Ei koneella leikattuja paloja pitkistä nauhoista.
4. **Äänimaisema:** valmis silmukka, joka on mitattu (LUFS, sauma); taso linjassa pelin äänilinjaan (askeleet ja salit noin −34 LUFS, musiikki −20, puhe −17…−20).
5. **Sokkokuuntelu:** Gemini 3.1 Pro kuvaa äänen tietämättä tavoitetta; ristiriita = hylkäys. Hyvin lyhyet (< 0,5 s) äänet toistetaan 3× hiljaisuudella, jotta Gemini kuulee ne.
6. **Ääniportti** (`aaniportti.py`, osa `vie-paketti.sh`:ta): true peak ≤ 0 dBTP (tavoite −1), kertaäänten kovuus perheessä; ElevenLabs-paketit tarvitsevat `kieli.json` (fi).
7. **Vienti uudelle polulle:** ämpäri ei ylikirjoita; korjaus = uusi polku (`-v2`) ja manifestiin `korvaa`. Ei aanitiedostoja repoon (5.14).
8. **Ilmoitus kytkijälle:** polku, tunnukset, taso, mitä korvataan; PT:lle ≤ 3 riviä.

## 3. Valmiin määritelmä (tarkistuslista)

- [ ] "Tarkista ennen" -lista käyty; päätös ei ollut jo olemassa (grep tehty).
- [ ] Musiikki: Lyria-kehote ja ottomäärä luvalla (KK:n "OMISTAJAN PÄÄTÖS" -rivi); kutsuja täsmälleen luvan verran; ei kieltoja kehotteessa; ei jälkisäätöjä (pitch/asetrate).
- [ ] Tehoste: lähde Soundly/Sonniss tai alkuperäinen Freesound CC0/CC BY; ei esikuuntelu-mp3:ta, ei koneleikattua palaa pitkästä nauhasta.
- [ ] Sokko-Gemini-kuvaus vastaa tavoitetta (ristiriita = hylätty).
- [ ] Ääniportti läpi, LUFS mitattu ja linjassa; `kieli.json` ElevenLabs-paketeille.
- [ ] Raaka tallessa (`_tyo`, NAS), vienti uudelle polulle, `LAHTEET.md` (lisenssi, nimeäminen jos CC BY) ja SHA256SUMS.
- [ ] Kytkijä kuitannut; mykistykset tai korvauslistat (`poista_v2`) kerrottu.
- [ ] Retrospektiivi kirjattu opit-osioon.

## 4. Opit ja retrospektiivi (kirjataan jokaisen työn lopussa)

Muoto: päivä, työ — mikä toimi, mikä hidasti, mikä muuttui pohjassa.

- **21.10.2026, Raamatun 5.15 jäi tarkistamatta (juoksupelin avaus).** Hidasti: avausmusiikiksi otettiin 20.10. "valmiista lähteestä" Freesoundin erhu (omistaja: "ääni oli huono") vastoin 19.10. linjausta (musiikki vain Lyrialla); lupa tulkittiin PT:n "valmiista lähteestä" -viestistä. Muuttuu: "Tarkista ennen" -osio on pohjan alussa; musiikki aina Lyriaa ja jokainen kutsu omalla luvallaan.
- **20.10.2026, Lyria-kehote sisälsi kieltoja.** Avausmusiikin kehote päättyi "no drums, no percussion, no bass, no synthesizers, no vocals" vastoin 5.16:ta (vain myönteisiä kuvauksia). Muuttuu: kehote myönteinen, ja se tarkistetaan 5.16:ta vasten ennen lupapyyntöä.
- **21.10.2026, Freesoundin esikuuntelu-mp3 ja koneleikatut palat.** Hidasti: juoksupelin korvaus- ja tehosteerissä (aanet-v4/v5/v6) osa äänistä leikattiin automaattisesti pitkistä nauhoista ja Freesound-äänet otettiin esikuuntelu-mp3:na, vastoin 5.27:ää; Gemini hylkäsi lyhyet (< 0,5 s) äänet turhaan. Muuttuu: alkuperäiset tiedostot ja valmiit yksittäiset äänet (Soundly/Sonniss), lyhyet äänet 3× toistettuna sokkokuuntelussa; poikkeamat kirjataan LAHTEET.md:hen ja kerrotaan PT:lle.
- **20.10.2026, ottomäärä sitoo.** Lupa "2 ottoa" kului, kun PT pyysi 06-huudon uusintaa; uusinta vaatii uuden luvan KK:n kautta (5.2). Muuttuu: Äänittäjä ei uusi omin päin, vaan lähettää syyn ja aineiston KK:lle.
- **21.10.2026, kieli ja kynnys.** Gemini kuulee sorinaäänet "ylimääräisenä kohinana", jos kriteeri on tiukka; sorinaäänimaisemille kriteeri "sorina, hennot askeleet ja kaiku sallittu; torju ymmärrettävä puhe, musiikki, kovat tapahtumat, ajoneuvohumina, tuuli/vesi".
- **20.10.2026, vienti ei ylikirjoita.** Korjaus samalle nimelle ei onnistu (vie-paketti.sh); uusi polku (`-v2`, `-v7`) ja kytkijän polunvaihto. Marmori-v7: kopioi aina uusin korjattu versio (v2b), ei ensimmäistä.
- **Soundly-GUI.** Ei toimi, kun omistajan Space on koko ruudun sovellus; ei kierretä. Käytä NAS:n Soundly-originaaleja ja Sonnissin paikallista hakua (`/Volumes/T7 4TB/sonniss/tyokalut/hae.py`).

## 5. Lähteet

Raamattu: 4.21, 5.1, 5.2, 5.11, 5.13, 5.14, 5.15, 5.16, 5.20, 5.27, 7.27, 9.11; `docs/moduulit/aanet.md`, `aanipohja.md`, `kertojan-teksti-ja-aani.md`; Äänittäjän luovutukset ja raportit 20.–21.10.2026 (`docs/raportit/aanittaja-*`).
