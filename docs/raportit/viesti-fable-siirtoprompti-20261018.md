# Siirtoprompti tilinvaihtoon (PÄÄTOIMITTAJA 18.10.2026 klo 00.3x; omistaja 00.34: "tee siirtoprompti toiselle tilille ja lopeta sessiot")

VVI-tili: viikko 93 %, nollautuu to 23.10. klo 07.59. Tarkka tila: docs/raportit/viesti-fable-luovutus-20261018-yo.md (KOKONAAN)
+ kohta 3 alla (muutokset 00.0x–00.3x). Roolit pyydetty 00.3x Postivahdin kautta: commit + push omaan haaraan, luovutus +
viesti-<rooli>-aloitus.md, kuittaus "LUOVUTUS VALMIS <sha>" (kohta 5).

## 1. Ensimmäinen viesti uuden tilin PÄÄTOIMITTAJA-sessioon

Omistaja avaa uudella tilillä session kansioon /Users/Shared/Claude/Matkakirja-fable (Opus, medium) ja liittää:

> Olet PÄÄTOIMITTAJA (Opus, medium), Matkakirjan päätoimittaja. Nimeä session nimeksi "PÄÄTOIMITTAJA (Opus, medium)".
> Checkout /Users/Shared/Claude/Matkakirja-fable. Aja git fetch origin. Lue CLAUDE.md, docs/raportit/viesti-fable-siirtoprompti-20261018.md
> KOKONAAN ja docs/raportit/viesti-fable-luovutus-20261018-yo.md KOKONAAN sekä muistin MEMORY.md (fable-tila-20261018-yo,
> pt-kuvan-tarkistus-taysikokoisena, julkaisu-vasta-omistajan-pyynnosta, yksi-juna-kerrallaan, testaus-vain-automaattiset).
> Ensin set_remote_control self true. Ota roolisessiot käyttöön siirtopromptin kohdan 2 taulukon mukaan (aloitusviesti kullekin;
> jos sessiota ei ole, luo se), kytke Remote Control kaikille, päivitä /Users/Shared/Claude/osoitekirja.md uusilla id:illä,
> käynnistä odottajavahti (kohta 4), tee tämän tilin Asemataulu (scratchpad/asemataulu/osoitteet.md, "Tilinvaihdossa"; lähde
> scratchpad/asemataulu/asemataulu-julkaisu.html) ja jatka JUNASTA 201 (kohta 3). EI jonokierros-cronia (Postivahti herättää).
> Keskustelukanava (KK) välittää omistajan päätökset; kysy tämän tilin viikkoraja KK:n kautta ja kerro se Postivahdille.
> Älä kerro omistajalle teknisiä yksityiskohtia.

## 2. Roolit

Aloitusviesti kullekin: "Olet <Rooli> (<malli>). Aja ensin git fetch origin, lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja
docs/raportit/viesti-<rooli>-aloitus.md omasta haarastasi (päivitetty 18.10. 00.3x:n jälkeen) sekä sen osoittama luovutus
kokonaan, ja jatka. Päätoimittajan session nimi on PÄÄTOIMITTAJA (Opus, medium). Jos sait vanhoja PT:n viestejä, ne on jo tehty."

Uudet session id:t → /Users/Shared/Claude/osoitekirja.md (kansiot ja mallit ennallaan).

JUNA 201 ON AUKI (omistaja 00.18 "julkaise kun nämä valmiit." / "eli kaikki junaan 201"): TF-lataus vasta, kun KK on
hyväksynyt (täysikokoisina, omistajan puolesta) ratas-, kohdevalikko-, kehys- ja Mona Lisa -parit + häivytysvideon.
Ei laitetestejä (23.21). Runko 21d5712be (testit vihreät 2015/607/508, tarkista 0; todisteapp proto-3d/lokit/natiiviseppa-app-201-lukitus-sim).

| Rooli | Checkout | Malli | Kärki |
|---|---|---|---|
| KESKUSTELUKANAVA | Matkakirja-fable | Opus, max | omistajan kortit; luodaan vain omistajan pyynnöstä; hyväksyy junan 201 parit omistajan puolesta |
| Postivahti | Matkakirja-posti | Sonnet 5.5, medium | kierros, mittarit, roolien nollaukset; uuden tilin viikkoraja |
| Asemataulu | Matkakirja-asemataulu | Sonnet 5.5, low | ASEMATAULU-ROOLI.md; uuden taulun osoite PT:ltä; junan 201 rivi päivitetty paikallisesti 00.2x (vie tauluun) |
| Julkaisija | Matkakirja-julkaisija | Opus, medium | simu-/käännösvuorot L1; TF 201 -lataus vasta PT:n luvalla (kohta yllä) |
| Natiiviseppä | Matkakirja-3d-selvittaja | Opus, high | JUNA 201 AUKI runko 21d5712be; ottaa KK:n hyväksymät: NUI, Valoseppä, LS, LR → lopullinen lukitus → JU kääntää → TF |
| Natiivi-UI | Matkakirja-natiivi-ui | Opus, high | junaan 201: 1) kehysnappien häivytys kaikissa linsseissä (23.02/23.10/23.16) + < 1 min video, 2) ⚙-ratas ISS-pöydän sisään (luonnos 0024, KK OK) + säädöt VAIN rattaasta koko pelissä (IssOhjaamo, IssKyytiNakyma, IssKytkinpoyta, OpasValikko ☀ → ⚙); EI IssKohdevalikkoa. KK tarkistaa: osuma-ala ≥ 44 pt, pitkät nimet (KÖÖPENHAMINA), SUUNTA-sauvan kulma iPhonella |
| Valoseppä | Matkakirja-linssiseppa-2 | Opus, high | junaan 201: ISS-kohdevalikko ilman ikkunaa + tyylikirjan pysäytyskuvapohja (pehmeä, erottuva), Aamu/Syksy/LIVE/NIMET pois IssKohdevalikosta; worktree wt/proto-linssiseppa2-kohdevalikko |
| Linssiseppä | Matkakirja-linssiseppa | Opus, high | junaan 201: pyramidin varjo v2.4 (ffa433c76, kontakti!), Mona Lisa: kävely suoraan penkkien läpi, tumma välähdys vastakkaiselle seinälle, sivuttaissiirto vierekkäisille, automaattinen zoomaus (kehys + maalaus kasvavat yhdessä) → < 1 min video + still. EI kehyksiä |
| Linnanrakentaja | Matkakirja-linnanrakentaja | Opus, medium | junaan 201: Louvren kehykset (Mona Lisalle renessanssiprofiili + veistetyt nauhat, kulta kultaisemmaksi, fr_A–D nauhat; MuseoRakennus/sali.json/pinnat); sitten arkki 5 (pallon varjo pois, PK 89f6fa43a) |
| Pelikoodari | Matkakirja-pelikoodari | Opus, high | juoksupeli ☰ › Pelit › Keskeneräiset tehty (78cd48f9d, junassa); editoriesikatselun korjauskierros |
| Karttaseppä | Matkakirja-karttaseppa | Opus, high | kohdekaupungit junassa (varmistus TF 201:ssä); Kiina v5 (0bf177c8b) simu JU:lla |
| Siirtoseppä | Matkakirja-siirtoseppa | Opus, high | levossa |
| Sisältökirjuri | Matkakirja-sisaltokirjuri | Sonnet 5.5, high | levossa; Codex-posti |
| Äänittäjä | Matkakirja-aanittaja | Sonnet 5.5, high | kielipakko #4830 mergetty; levossa |
| Laitetestaaja | Matkakirja-laitetestaaja | Sonnet 5.5, high | levossa (ei testejä junaan) |

## 3. Muutokset 00.0x–00.3x (luovutuksen -yo jälkeen)

- OMISTAJA 00.10: "älä käytä näitä enää koskaan: Kehittäjä › Kokeet › Juoksupeli / siirrä kaikki aina keskeneräisten alle joko
  linsseihin tai peleihin." → PK 78cd48f9d junassa. Raamattu + loki PR #4834.
- OMISTAJA 00.15 + 00.17: ⚙-ratas (ohjauspöytään jos mahtuu, muuten ☰:n viereen) ja säädöt vain rattaasta koko pelissä. PR #4834.
- OMISTAJA 00.18 PYYSI JULKAISUA: "julkaise kun nämä valmiit." / "eli kaikki junaan 201" → kaikki ylläolevat junaan 201;
  ISS-kohdevalikko koko ruudulla = poikkeus 45 %:n säännöstä (PR #4834).
- Astroselite täysin peittävä (NUI 00228d16d) KK hyväksyi 00.10 → junassa (runko 21d5712be).
- Kohdekaupungit (KS 440325942) KK hyväksyi haitattomana 00.22; varsinainen varmistus TF 201:ssä (KK pyytää omistajaa katsomaan).
- Mona Lisa: KK hyväksyi vain napautuksen (m2); kehys, zoomaus ja liike puuttuvat (KK 00.37) → TF ei lähde ilman niitä.
- Mergetty: #4830 (suomi pakotettuna), #4832 (Claude-API uusi avain). #4834 testit ajossa (taustaskripti mergeää vihreänä;
  tarkista `gh pr view 4834`).
- OPPI: PT hyväksyi Mona Lisan katsomatta kehystä → muisti pt-kuvan-tarkistus-taysikokoisena (lisäys 00.38).

## 4. Ajastukset uudessa sessiossa

- Monitor "python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py", timeout_ms 1800000; uudelleen joka vanhenemisella
  (TILA-rivillä poista talo/toimi-*-odottaa, joita ei listassa; TYHJÄKÄYNTI → erä tai syy).
- EI JONOKIERROS-cronia.

## 5. Roolien luovutukset

Kuittaukset (haara + SHA) kirjataan tähän, kun roolit vastaavat "LUOVUTUS VALMIS".
