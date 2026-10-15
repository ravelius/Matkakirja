# Natiivi-UI: luovutus 15.10.2026 klo 18.2x (PT: konteksti 29 %)

Natiivi-UI (Opus, high) → seuraava Natiivi-UI-sessio. Edellinen: viesti-natiivi-ui-luovutus-20261015-ilta2.md (lue sen AVOIMET ja Opit),
säännöt -20261014-ilta3.md ja -20261014-paiva.md. Viestit send_messagella id:llä (/Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, worktree wt/proto-natiivi-ui-aloitus-195 (haara natiivi-ui/aloitus-195,
remote natiivi-backup). Ennen käännös-/testipyyntöä: sh Linssit-testit/unity-tarkistus.sh + python3 tyokalut/kielivahti.py +
tyokalut/pohjavahti.py (huom: unity-tarkistus EI käännä Editor-kansiota, AsetteluTesti.cs tarkistettava silmin).

## TEHTY tässä sessiossa (pushattu natiivi-ui/aloitus-195; Pelikoodarin pelikoodari/aloituskone-195 e36f3b880 on 8eaf6307c:n päällä)
- 1c94d9746 TF 194 -palaute 17.52 kohdat 1–5 (PT kuitattu viestillä): raketin latauskuvassa vain "Andøya" (kuvateksti pois,
  "Havainnekuva" tooltipiin + Tietoja ui.tietoja.raketin-latauskuva); lukemat AIKA+NOPEUS vasen, KORKEUS+G-VOIMA oikea reuna
  (omistajan sana: "kummassakin reunassa … nyt toinen keskellä alhaalla"); reunan Pulu Peita laukaisun ajan (RakettiNakyma.Nayta/Pois);
  ohjaamon NYT-nappi pois → kohdevalikon 1. rivi "ISS nyt" (PalaaIssNyt); pienoispallon haku: 250 ms:n seuranta katkaisi pyörityksen
  (Kohteeseen → LopetaSelaus) → Sijaintipallo.Selaa, napautus/veto erotettu (8 pt), kulmapallon koko telineeltä, lukitus asettaa
  IssKohdevalikko.ValittuPaikka. Kertojan NYT-napin repliikki KupoliAanet.cs:157 → Äänittäjä + PK (PT tietää).
- Live-nappi vuorokausi-/vuodenaikavalintojen viereen: OLI JO TEHTY 14.10. (kohdevalikon ylärivi), ei avointa.
- a5e0d1373 SIJAINTIKARTTA (toimeksianto Matkakirja-fable/scratchpad/keskustelukanava/iss-yotaivas-20261015.md kohta 2), kytkimen
  IssKohdevalikko.Ryhmat takana (oletus false): "Tähtitaivas ja revontulet" (Lappi 68,9/27,0, Pohjois-Norja 69,65/18,96, Eteläinen
  valtameri −60/140; kuvat NASA-kohteista aurora-scandinavia / revontulet-pohjoinen / revontulet-etela; lento talvi+yö
  LennaOmaanValinnalla), sitten Kaupungit / Luonto / Ilmiöt / Ihmisen jäljet (IssKohderyhmat.cs, tunnuslistat; tuntematon → Luonto),
  rivillä mk-astrokuva__pikku-pikkukuva, lataus näkyvistä (LataaNakyvat). Testit: `ui linssi kohdevalikko ryhmat 0|1|esimerkki`.

## AVOIMET (seuraajalle, järjestyksessä)
1. KUVAPARI KÄYNNISSÄ: Julkaisija antoi "ASETTELU NYT" (linna, iphone+ipad). Ajo käynnistetty 18.20 taustalle:
   lokit/nui-asettelu-kohdevalikko-20261015-1820.out (proto-3d); PNG:t <loki>-kuvat/ (polku .out-tiedoston lopussa). Tarkista kuvat
   (kohteet ja pikkukuvat verkosta, odotus 4 s; tyhjä lista = satelliitti-datan haku epäonnistui editorissa → korjaa ja aja uudelleen).
   Ilmoita Julkaisijalle (local_5cb16c00…) KÄÄNNETTY/VIKA + lokin polku, ja PT:lle kuvapari "iss kohdevalikko nyt | ryhmät" polkuineen.
2. Omistajan OK:n jälkeen: IssKohdevalikko.Ryhmat = true (oletus) + juna. Ilman OK:ta ei kytkentää.
3. Mahdolliset jatkot samasta toimeksiannosta (vain PT:n pyynnöstä): ryhmien otsikoihin kuvake vaatii uuden pohjan (viivaikoneissa
   ei kaupunki/vuori/vesi) → PT → omistaja. "Ihmisen jäljet" on oma lisäys (omistaja: "esim. kaupungit, luonto, ilmiöt").
4. Edellisen luovutuksen avoimet (intro-pehmennys 8eaf6307c laitteella, lasipohjan riskit, levyn app-kopiot) ennallaan.

## Opit
- IssKohdevalikossa metodi nimeltä IssNyt varjostaisi luokan Matkakirja.Linssit.Iss.IssNyt (IssNyt.Kello() kausivalinnassa).
- Sijaintipallon Napautettu-kuuntelija teki pallosta napautusnapin, joka toggasi koon jokaisella sormen laskulla; nyt napautus vasta
  nostossa ilman vetoa. Kasva() laski kulmapallolle vasemman alakulman mitat (nosto 36 pt) → kulmassa ohitetaan.
