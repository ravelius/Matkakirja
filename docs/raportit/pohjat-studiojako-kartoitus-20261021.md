# Pohjat studion tapaan: nykyisten ohjeiden kartoitus (PT:n Sonnet-agentti 21.10.2026 klo 18.0x)

Tässä inventaario suomeksi. Tutkin vain luettavaa: `origin/main`, jonka Raamattu (648 riviä) on uudempi ja numeroitu, ja PR-haarojen tiedostolistat. Levyllä oleva `js/tyohuone-raamattu.js` on vanha (9.10., ilman numerointia).

**Tilanne lyhyesti**
- Tuotantopohjia on `docs/moduulit/tuotantopohjat/` -kansiossa 11 kpl. PR 5150 lisää kansioon uuden tiedoston `musiikki-ja-aanet.md`.
- Raamatun luvut ovat: 1 Visio, 2 Pelisuunnittelu, 3 Tarina ja kerronta, 4 Taide- ja UI-tyylikirja, 5 Ääni, 6 Tekniikka, 7 Tuotantoputki, 8 Valmiin määritelmä, 9 Testaus, 10 Julkaisu, 11 Sisältö ja lisenssit, 12 Työkalut, 13 Sanasto, 14 Päätöshistoria.
- Muita lähteitä: `docs/moduulit/*.md` (19 moduuliohjetta), `CONTRIBUTING.md` (vain sisällön ja linssin lisäys, PR-ohje) ja `docs/raportit/*tyyli*` (kaupunkikohtaisia tyyliauditteja). `docs/tyyli*/` -kansiota ei ole.
- Avoimet PR:t (tuotantopohjat):

| PR | Mitä lisää |
|---|---|
| 5140 | "Tarkista ennen" -osio: kertojan-teksti-ja-aani, kuumailmapallokierros, paakaupungin-avaus, taidemuseon-maa |
| 5141 | historiapeli: "Tarkista ennen" |
| 5142 | 3d-maamerkki ja codex-3d-toimitus: "Tarkista ennen" |
| 5143 | uusi-linssi: "Tarkista ennen" |
| 5145 | esirenderoity-video ja tuotantoputken-tarkistukset: "Tarkista ennen" ja testivaatimus (+ `tests/tuotantopohjat.test.mjs`) |
| 5150 | **uusi `musiikki-ja-aanet.md`** ja kertojan-teksti-ja-aani |
| 5153 | historiapeli: rekvisiitta- ja kokoelmatekstit |

- PR 5140–5145 ja 5153 muokkaavat olemassa olevia pohjia. Ainoa uusi pohjatiedosto on `musiikki-ja-aanet.md` (5150). Muissa avoimissa PR:issä (5123 pohja-lento, 5104 pohja-henkilöt) on lisäksi Linssiseppä- ja Lavastaja-osioita.

**A) SUUNTA**

| Kohta | Lähde | Huomio |
|---|---|---|
| Taide | Raamattu 4.1–4.48 (UI kevyt, lasi, tokenit, kartan akvarellityyli 4.34–4.36, aito 3D 4.41–4.44, kuvatyyli 4.47); `docs/raportit/*tyyli*` | Laadun mittari ja esimerkit hajallaan. Valmista "laatutaso + esimerkkikuvat" -sivua ei ole. |
| Ääni | Raamattu 5.1–5.27 (luvat, ElevenLabs/Lyria, PCM, äänipankki); `docs/moduulit/aanet.md` (1265 r.), `livia-aani.md` | Sisältää myös luvat ja tekniikkaa (sekoitus). |
| Kerronta | Raamattu 3.1–3.24 (kaanon, kirjoittajan säännöt, pituusbudjetit 3.18, spoileri 3.20); `tarinakaari.md`, `horatio-livia-tuotanto.md` | Hyvin katettu. |
| Kamera | Raamattu 2.15, 2.68, 2.202 (yksi pehmeä kaari), 4.23–4.24; `uusi-linssi.md` luku 3 (Kamerajohtajan opit) | Kameran suunta on 4.24:ssä, käytännön opit piilossa linssipohjassa. |

**B) TEKOTAVAT**

| Ala | Lähde | Huomio |
|---|---|---|
| 3D | `3d-maamerkki.md` luvut 2.2–2.7 (lähteet, mittasuhteet, LOD0 ≤ 250 k / LOD1 ≤ 100 k / LOD2 ≤ 20 k, materiaalit, albedo-sovitus), `codex-3d-toimitus.md` luku 6 (mobiilirajat: kolmiot, ≤ 300 primitiiviä, ≤ 32 materiaalia, tekstuurit ≤ 2048); Raamattu 6.16 | Paras katettu ala. Budjetit ovat kuitenkin kahdessa pohjassa ja numerot eroavat (Louvre-LOD vs. Codexin raja). |
| Kuvat | Raamattu 11.1–11.25, 4.47; `viitekuvat.md` (viitekuvallinen herogenerointi) | Lisenssi ja kanavat katettu. Kuvanteon käytännön kaava (kehote, laatuportti) puuttuu. |
| Kamera ja video | `esirenderoity-video.md` (kulut A/B, tallennin, laatutaso), Raamattu 4.23–4.26 | Kameraliikkeet katettu. Valaistus ja leikkaus eivät. |
| Tekstit | Raamattu 3.15–3.24; `tarinakaari.md`, `kaupunkilehti.md`, `kertojan-teksti-ja-aani.md` | Hyvin katettu. |
| Ääni (teko) | `kertojan-teksti-ja-aani.md`, PR 5150 `musiikki-ja-aanet.md`, `aanet.md`, Raamattu 5.x | Teko-ohje kertojalle ja musiikille tulossa. Efektit: vain Raamattu 5.27. |
| UI | Raamattu 4.1–4.19, 4.28–4.33, 2.201; pohjien "Natiivi-UI"-osiot | Sääntöjä on, vaihe vaiheelta -ohjetta ei. |
| Koodi | Raamattu 6.x; `karttapallo.md`, `linssit.md`; `CONTRIBUTING.md` (linssin lisäys) | Arkkitehtuuri katettu. Ei Swift/C#-konventioita eikä koodikatselmuksen listaa. |
| Testaus | Raamattu 9.1–9.10; `tuotantoputken-tarkistukset.md` (tuontitarkistus, kameratesti, nykäysvahti, läpipelubotti) | Hyvin katettu, mutta sekoittuu porttiin ja rooleihin. |
| Julkaisu | Raamattu 10.1–10.17; pohjien "Julkaisija"-osiot; `siirtoraportti.md` | Hajallaan. |

**C) RESEPTIT**

| Tuotetyyppi | Lähde | Huomio |
|---|---|---|
| Linssi (tyypeittäin) | `uusi-linssi.md`, `linssit.md`, Raamattu 2.59–2.71, 2.105–2.123 (aika-, alue-, virta-, data-, taidemuseolinssit) | Tyyppikohtaista reseptiä ei ole. Linssimoottoreita (aikajana, alue, virta) kuvataan vain Raamatussa. |
| Historiapeli | `historiapeli.md` | Kattaa idean junaan asti. Sisältää samalla roolit, sisällön ja UI:n. |
| Minipeli | Raamattu 2.201 (Pelit – yhteiset säännöt); `docs/pelikatalogi.md` ei skannattu | Omaa pohjaa ei ole. |
| Museo | `taidemuseon-maa.md` | Yksi pohja: valo, salit, linssidata, ääni, UI. |
| Pääkaupungin avaus | `paakaupungin-avaus.md` | Hyvä pohja. |
| Pallokierros / kuumailmapallo | `kuumailmapallokierros.md`, Raamattu 2.79–2.97 | Hyvä pohja. |
| 3D-maamerkki | `3d-maamerkki.md`, `codex-3d-toimitus.md` | Hyvä pohja. |
| Muut | `esirenderoity-video.md`, `kysymys-omistajalle.md`, `uusi-linssi.md` | Eivät kuulu omistajan listaan, mutta ovat olemassa. |

**D) TUOTANNONOHJAUS**

| Kohta | Lähde |
|---|---|
| Vaiheet ja roolit | Raamattu 7.1–7.43; pohjien luku "Tuotantoputki ja roolit"; 4.22 sanasto |
| Portit | Raamattu 8.1–8.5 (valmiin määritelmä, kultainen polku); 9.1–9.10; pohjien "Valmiin määritelmä" ja "Hyväksyntäpolku" |
| Luvat | Raamattu 5.1–5.3 (äänet), 11.6–11.14 (Tripo, kuvat), 7.15 (Codex grafiikkatyöstäjä). Toistuvat kopioituna jokaisessa pohjassa ("Generointilupa", "Omistajalle myöhemmin"). |
| Luvat kerran | EI LÄHDETTÄ. Lupataulukkoa ei ole yhtenä paikkana. |

**Pohjat, jotka sekoittavat useita kategorioita (jaettava)**
- `3d-maamerkki.md` ja `codex-3d-toimitus.md`: tekotapa (B), resepti (C), portit ja luvat (D) ja roolikohtaiset TÄYDENTÄÄ-osiot samassa tiedostossa.
- `historiapeli.md`, `taidemuseon-maa.md`, `paakaupungin-avaus.md`, `kuumailmapallokierros.md`, `uusi-linssi.md`: kaikissa on omistajan lisäämä aloitusproosa (4.21, 2.70, "Koko työ ideasta junaan") kopioituna jokaiseen. Sen sisältö kuuluu kerran lukuun D.
- Samoissa pohjissa on roolikohtaisia 3D-, ääni- ja UI-osuuksia (Valoseppä, Lavastaja, Äänittäjä, Natiivi-UI). Ne kuuluisivat B-ohjeisiin, ja reseptiin jäisi vain viittaus.
- Raamattu itse sekoittaa kategoriat: luvussa 4 on UI, kartta, 3D ja kuvat; luvussa 2 linssejä, UI:ta ja kameraa.
- `aanet.md` (1265 r.): suunta, tekotapa ja inventaario yhdessä.
- `tuotantoputken-tarkistukset.md`: testaus (B) ja portti (D).

**Suurimmat aukot: käytännön "näin tuotat sen" puuttuu**
1. Taiteen laatutaso: ei esimerkkigalleriaa "hyväksytty / ei hyväksytty" kuvista, malleista ja UI:sta. Raamattu antaa vain sääntöjä.
2. iPad- ja iPhone-budjetit yhtenä taulukkona: kolmio-, tekstuuri-, muisti- ja lämpöbudjetit ovat hajallaan (Raamattu 6.14–6.16, Codex luku 6, 3D-maamerkki 2.4). Ei laitekohtaista (iPad vs. iPhone) taulukkoa.
3. Valaistus ja leikkaus videossa ja kohtauksissa: kameraliikkeet on kuvattu, valoa, rytmiä ja editointia ei.
4. Kuvien teko: kehotekaava, viiteaineisto ja hylkäysperusteet Codex-kuville. Raamatussa on vain kanavat ja lisenssit.
5. Äänitehosteiden tekotapa (foley, miksaus, äänenvoimakkuus) on vain periaate 5.27:ssä. Musiikin ohje tulossa PR 5150:ssä.
6. UI-toteutus: vaiheittaista ohjetta napista, paneelista ja ikkunasta natiiviin ei ole. Säännöt ja tokenit ovat kyllä olemassa.
7. Koodin tekotapa: nimeämis-, rakenne- ja katselmusohje puuttuu. `CONTRIBUTING.md` kattaa vain datan ja linssin.
8. Minipelin resepti: ei pohjaa eikä pelisuunnittelun tarkistuslistaa (idea, silmukka, vaikeus, tuntuma).
9. Luvat yhtenä taulukkona (kuka saa generoida mitä ja kenen luvalla). Nyt luvat on toistettu jokaisessa pohjassa.
10. Aloitusproosan kopiot: viisi tai useampi pohja alkaa samoilla omistajan lainauksilla, ja "Tarkista ennen" -PR:t lisäävät sitä lisää. Pohjat ovat enimmäkseen lupia ja portteja, ja varsinaisia työvaiheita on vähän.