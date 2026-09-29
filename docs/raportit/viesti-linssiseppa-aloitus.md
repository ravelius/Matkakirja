# Linssisepän aloitusviesti (päivitetty 29.9.2026 klo 10.2x)

Olet Linssiseppä (Opus, max-tila) ja omistajan päätöksellä (22.2x) myös Mallinseppä.
- Checkout: /Users/Shared/Claude/Matkakirja-linssiseppa (haara linssiseppa-tyo-20260923).
- Proto-git: /Users/Shared/Claude/proto-3d/Matkakirja-proto. Omia worktreitä ei ole (tervetulo poistettu merge-pyynnön jälkeen;
  haara linssiseppa/pulun-tervetulo 5b3acd53 Natiivisepällä 1.0.45:tä varten).
- master kuuluu Natiivisepälle, integraatiohaara on juna/b13 ja 1.0.40:n sivuhaara natiiviseppa/juna-1040.

Lue:
- CLAUDE.md
- Raamatun Ydinajatus kohta 2 (FABLEN KÄSKYT, JUMI → FABLE, VIESTIRAJA JA VARAKANAVAT)
- Raamatun kohdat ELÄVÄ KARTTA ja elävät elementit (säännöt), ESILATAUSPOLITIIKKA, NATIIVI PELI ETUSIJALLE ja
  PELIT, TALOUS JA LUENTA; VAIN EUROOPPA (omistaja 27.9. klo 13.5x #3416: erikoismallit, meren lajien sijoitus ja linssien uudet
  kohteet vain Eurooppaan, kunnes omistaja toteaa Euroopan valmiiksi)
- proto-3d/TYOTAPA.md ja RAJAPINTA.md, proto-3d/lokit/elava-kerros-rajapinta.md
- **docs/raportit/viesti-linssiseppa-luovutus-20260929-b.md**: astroselite on juna/b13:ssa. Pulun taulu ja LISÄYS 6 ovat
  haarassa linssiseppa/pulun-taulu 9750340f, ja niiden uusintakierros ja merge-pyyntö ovat kesken. LisaaRivi on
  Linssiseppä 2:n avaruuskävelylle. Aiemmat luovutukset: -20260929.md (Cupola 3) ja -20260928-u.md.
- docs/raportit/symbolit-3d-kallistus-20260928.md (3D-symbolien kokolaki, maalle-siirto ja A/B-komennot)
- docs/raportit/iss-realismi-suunnitelma-20260928.md (ISS-realismin kaavat, vakiot, datalähteet ja tila)
- docs/raportit/meri-laatu-speksi-20260927.md (meren laatutaso, §6 tila)
- Mallinsepän tehtävä: `git show origin/mallinseppa-tyo-20260926:docs/raportit/viesti-mallinseppa-aloitus.md`,
  rajapinta proto-3d/lokit/mallinseppa-rajapinta.md, speksit docs/raportit/erikoismallit/*.md ja erikoismalli-speksi-pohja.md

**Järjestys (tila 29.9. klo 10.2x):**
0. Pulun ISS-tervetulo (web #3575) on MERGE-PYYNNÖSSÄ Natiivisepällä 1.0.45:een: proto linssiseppa/pulun-tervetulo 5b3acd53.
   Se vaatii natiivi-ui/avaukset 3621d00d:n (Ponnahdus). Raportti, mitat ja poikkeamat ovat tiedostossa
   docs/raportit/pulu-tervetulo-natiivi-20260929.md. Laitekierros 9/9 PASS iPhonella ja iPadilla, ja kuvaparit ovat kansiossa
   proto-3d/lokit/linssiseppa-laite-20260929-tervetulo/. Seuraa mergeä ja vastaa korjauspyyntöihin.
   Ajo: tyokalut/linssiseppa-ajot/ajo-tervetulo.sh, ajo-tervetulo-web.mjs ja koosta_tervetulo.py. Testikomento on
   `ui linssi tervetulo [tila|aloita|ohita|pura|nollaa]`. Laiteajossa kertoja on oltava päällä (`puhe paalle`), muuten tervetulo
   on mykistetty.
   Natiivi-UI:n haara natiivi-ui/ponnahdus-herata 6c3df126 tekee Ponnahduksesta itseherättävän ja jättää Pulun kuplat
   kuvan taakse; se yhdistyy ilman konfliktia. Kun se on masterissa, omat Ruudunpaivitys.Herata-kutsut PulunTauluNakymasta
   ja Kuvanakymasta voi poistaa (ne eivät haittaa).
1. Pulun taulu ja LISÄYS 6 ovat MASTERISSA (9750340f, master 634be415).
2. Taulun SHA on kerrottu Linssiseppä 2:lle 29.9. klo 10.2x.
2b. LINSSIEN ESITTELYT (Päätoimittajan erä "Linssit- ja Aarteet-näkymät", omistaja 29.9. loki 09.12/09.14) on MERGE-PYYNNÖSSÄ:
   proto linssiseppa/linssi-esittelyt 3ef58ac6 (d42d11d5 + Kartta-testien lähdelista). Siinä ovat LinssiTiedot.Esittely ja Havainnekuva (moduulin JSON ensin, sitten
   LinssiEsittelyt-taulu) sekä kultainen linssi-esittelyt.json webin #3611:stä. Näkymät tekee Natiivi-UI (natiivi-ui/pillerivalikko,
   Linssivalitsin.Pilleri.cs), sovittu Natiivi-UI:n ja Päätoimittajan kanssa. Esikatselu lukee Esittely ?? Lyhyt ja
   Havainnekuva ?? varustekuva. KESKEN: iPhonen web | natiivi -kuvapari, kun Pelikoodarin webmalli on pushattu (nyt committoimatta
   wt/pelikoodari-pillerivalikko). Jos #3611:n teksti muuttuu, tee kultainen uudelleen (tee-linssi-esittelyt.mjs).
3. Cupola 2 -kuvien alfa 252–254 korjataan cupola3_pehmea.py-mallilla vain, jos ne palaavat käyttöön. Kohta 4 (BMNG, Kuu,
   tähdet) ja Maapallon vuosi ovat Linssiseppä 2:lla.

Linjaus: uusia linssejä ei aloiteta ennen pariteettia. Poikkeuksia ovat Ihmisen matka II (omistaja 25.9., vain natiivi) ja
elävä kartta (omistaja 26.9., vain natiivi).

Työtavat:
- **Simulaattorit:**
  - omat: linssiseppa-iPhone D0D2CD1E-70C7-4140-A972-E615212E8911 ja linssiseppa-iPad11 903C2B91-34C3-4C43-A392-A52F7DAFD96C
  - booted-simulaattoreita saa olla alle 2 ennen aloitusta (ajoskriptit odottavat itse)
  - sammutus vain omat UDID:llä, EI `shutdown all`
  - mykistä testit (`komento.txt` → `hiljaa`)
- **Käännökset:** `S=<S> proto-3d/tyokalut/linssiseppa-ajot/kaanna-jono.sh <nimi> <haara[+haara]>` (proto-kaanna.sh, pohja
  master + haarat). **Julkaisija jakaa käännösvuorot ja simulaattoripaikat** (28.9.): pyydä vuoro, odota "NYT", ilmoita
  "käännös valmis" ja sammutus. Päiväsääntö: käännökset yksi kerrallaan, simulaattoreita enintään 2. Yötauko klo 22.30 → ei
  käännöksiä eikä simulaattoreita (muistio kaannokset-erina-polton-aikana).
- **Ämpäri:** `source ~/.zshrc` (AWS_*, PAATE, AMPARI) ja `aws s3 cp … s3://$AMPARI/<polku> --endpoint-url $PAATE`.
- **Ajoskriptit:** proto-3d/tyokalut/linssiseppa-ajot/ (ajo-mallit.sh, ajo-meri-laatu.sh, ajo-meri-ennen-jalkeen.sh,
  koosta_meri_laatu.py) ja meren harness proto-3d/tyokalut/meri-laatu/ (kaanna.sh, aja.sh, piirra.py, integroi_laatu.py).
  Erikoismallien esikatselu ilman Unityä: proto-3d/tyokalut/mallinseppa-esikatselu-* (m1–m3 valmiina erälle 4).
- **Kuvat omistajalle:** laitteen ruutuna rajattuna, kulma ja versio (SHA) kuvassa, ennen | jälkeen vierekkäin.
- **Tiedostojen omistajat:** UI-tiedostot ovat Natiivi-UI:n. Pallo, kamera, laatat ja Symbolimalli-varjostin ovat Natiivisepän.
  Äänipalvelut ovat Pelikoodarin. ElavatElementit, MeriKoristeet, MeriLajit ja MeriMalli ovat Linssisepän.
- **Viestit Fablelle** (id local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31): vain valmis erä, jumi tai kysymys, enintään 8 riviä.
  Jos SendMessage ei herätä vastaanottajaa, käytä mcp send_message -työkalua session id:llä.
- **Agentit** vain Opus tai Sonnet. Lokikansioon vain kuvat, videot ja konsoli. Erä-worktreitä enintään 3.
  Mergetyt poistetaan: tools/uusi-worktree.sh --poista, ja proto: git worktree remove.
