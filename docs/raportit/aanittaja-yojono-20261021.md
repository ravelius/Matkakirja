# Äänittäjän yöjono 21.10.2026 (Raamattu 7.46; PT:n pyyntö 21.10.)
Kaikki ilman generointilupaa; tulokset raportteina `docs/raportit/aanittaja-yo-*.md` ja mediat `proto-3d/_tyo`. Järjestys = prioriteetti.

1. LS:n Ranskan lattiat `kivi_hiekka` ja `sora`: v3-paketti (25 tiedostoa) jo ämpärissä 16.10.; varmista manifesti + portti uudelleen, mittaa taso vs parketti/marmori, selvitä kytkentä (MuseoAskeleet) ja ilmoita LS:lle/PK:lle puute.
2. Puuttuvien näytteiden kartoitus: kaikki museoiden `lattia`-arvot (sali.json, kaikki maat) vs olemassa olevat askelsarjat → lista lattioista ilman omaa näytettä, ehdotus Soundly/Sonniss/Freesound-aukkohakuihin.
3. Aukkohaku-ehdokaslistat (Freesound CC0/CC BY, Sonniss; ei latausta ennen sokkokuvausta) kohdan 2 lattioille.
4. Äänipankin järjestys: `rekisteri.json` – vapaat äänet (ei käyttöpaikkaa), törmäävät käyttöpaikat ("sama ääni ei kahta henkilöä samassa paikassa"), hylätyt, ikä/sukupuoli-taulukko; uusi selaustaulukko `aanipankki/YHTEENVETO.md`.
5. Äänitasot: kaikkien `_valmiit/*`-pakettien LUFS/true peak perheittäin; poikkeamat perheen mediaanista ja ehdotus tavoitetaulukoksi (musiikki / tehoste / puhe / askel).
6. Ääniportti uudelleen koko `_valmiit`-arkistolle; varoitukset (true peak > −1 dBTP) ja hylkäykset listaksi.
7. `kieli.json`-pakko: tarkista kaikki ElevenLabs-paketit (LAHTEET mainitsee) ja kaikki `_tyo`-skriptit (`language_code fi` rungossa).
8. Raaka-otot (Raamattu 5.13): jokaiselle ElevenLabs/Lyria-paketille raaka `_tyo`-kansiossa; puutteet listaksi.
9. Manifesti vs ämpäri: pelin äänimanifestien rivit ↔ ämpärin objektit (HEAD); orvot ja puuttuvat.
10. `mykistetyt`-kentät: mitkä mykistykset voi purkaa (uusi ääni jo kytketty); ehdotus kytkijöille.
11. Pulun tekstit: haku `[softly]`/`[whispers]`-rikkomuksille datassa.
12. Kertojan tekstit: lukutarkistus-lintti (luvut 100–199, "eaa."/"jaa.", suuraakkoset) kaikissa luettavissa dataissa.
13. Juoksupelin SFX-inventaari: aanet-v1/v1.1 (68 kpl) paikallinen AST-luokitus vs tiedostonimi → epäilyttävät (vrt. puuaskel = korkokengät) listaksi korvaushakuun Soundly/Sonniss ensin.
14. Olavinlinnan repliikit: mikä versio (3 per repliikki) on kytketty, käyttämättömät otot listaksi (kulutuksen hallinta).
15. ElevenLabs-merkkikirjanpito: kaikkien pakettien LAHTEET-luvat vs käytetty → taulukko `docs/raportit`ille (kuukausi/viikko).
16. Tason 2 juoksupelin musiikit: ehdokaslista Sonniss/Freesound (CC0), sokkokuvaus paikallisella AST:lla; Lyria-kutsut vain luvalla.
17. Käännösäänen mittaussuunnitelma (museon askelkytkentä, taso 0,32×askel): skripti valmiiksi PK:n pelitallenteelle.
18. Äänipankin näytteet: mittaa jokaisen äänen näytteen taso (LUFS) ja ehdota tasaus (ei jälkisäätöä puheeseen – vain mittaus).
19. Soundly/Sonniss-lisenssitaulukko: pakettien LAHTEET → yhteinen `LISENSSIT-AANET.md`-luonnos (nimeämisvaatimukset, CC BY).
20. Vanhojen Äänittäjä-luovutusten arkistointi ja tiivistys (docs/arkisto), `proto-3d/_tyo`-kansion siivousehdotus (ei poistoja).
21. Huutojen (juoksu) tason ja leikkausten tarkistus: v1/v2/v3-pakettien taso keskenään, ehdotus PK:lle.
22. Askelsarjojen jäsenmäärä per lattia: alle 3 eri askelta → "toisto kuuluu" -lista.

Generointilupaa vaativat (PT:lle tekstinä, KK esittää): (a) tason 2 musiikit Lyrialla; (b) mahdollinen uusi pitempi huuto 05/06 suoraan ohjeella (venytys on AVOIN OMISTAJALLE); (c) aukkolattioiden omat näytteet, jos Soundly/Sonniss/Freesound eivät riitä.
