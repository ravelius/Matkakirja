# Päätoimittajan luovutus 17.10.2026 klo 06.4x (konteksti 30 %; tili vvi@vvi.fi)

PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589. Id:t /Users/Shared/Claude/osoitekirja.md.
Asemataulu https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm; paikallinen talo/junat.json ajan tasalla 06.4x.
Edellinen luovutus: viesti-fable-luovutus-20261017-aamuyo.md (#4772). KELLO AINA `date +%H.%M`.

## 0. Heti aluksi
RC päälle, odottajavahti-Monitor (30 min, uudelleen joka vanhenemisella), get_usage self.

## 1. YÖN VALTUUTUS (omistaja 01.03) voimassa kunnes omistaja herää
"Hyväksy kaikki puolestani ja yritä saada kaikki joko ensimmäiseen tai viimeistään toiseen junaan ja julkaise ne"
= OMISTAJA PYYSI JULKAISUA. KK hyväksyy esikatselut puolesta: PT tarkistaa kuvan ensin, lähettää polun + arvion + suosituksen.

## 2. JUNA 198 LUKITTU 06.36 → TF KÄYNNISSÄ
BUILD d457a1034 (runko d7d9af99c, käännös d7c837183), M 8fb9c738a (#4775, muutosloki v5).
JU käynnisti TF 198 06.4x (ajo 38999461924, sisäinen + ulkoinen); Mac: NS ajaa mac198.sh.
SEURAA: TF 198 iOS + Mac valmis → Asemataulun rivi "lukittu 06.36, matkalla TestFlightiin" → TF 198 -rivi; KK:lle tiedoksi.
Avoin tarkistus: ISS-pikkupallon harmaa telinelaatikko poistettu koodista (KS aeb76a609); kuva lukitusappista vasta NS:n SIMU NYT -vuorolla → PT katsoo.
Sisällä (kaikki KK:n hyväksymät): SS äänipohja 0bfc62868, LS vapaalento c59d63e01 + kontrasti 8dd489981, PK yhteis-198b 6e1e510c8 (B lukija, raketin liuku, ISS-vieritys; EI intro C), KS ISS-reitti aeb76a609, LS Kiina fce13114a + testikorjaus 109a2ad36 (vain kehittäjälle; pelaajille 199:ssä), NUI museo-kevyt a7327efa2, NUI Isoisän uni 0b8555d23, NUI ISS-luettelo e208d45fe (+ kupoli-nimet 08222841b).

## 3. JUNA 199 — JONO NS:llä (avautuu nyt)
- SS todistusajo d6578a2cc (ui-puu.json tuore_puu), SS äänivahti 0a3c4b09c
- LS Alankomaiden kohdat 0836aa941 (195 ympyrää = main d69b94eb0), Kiina-199 95c450bf8 (nimet pysäkillä, Kiina porttilinsseihin, Lontoon kortti pois), kaasuvipu 792952911 (KK hyv. 07.0x, oletuksena päällä)
- NUI tekijärivi efa7e6b1e (PT hyv.)
Tulossa 199:ään (kuvat PT → KK ennen kytkentää):
- PK yhteis 48ea3ea02: liuku kameran pyyhkäisyn jälkeen + lanka selvemmin, intro C v2 (nykäykset; 1. yritys 232 ms), I/O pois pääsäikeestä 010a431f2. Lisäksi SEURAA-kuuntelija (IssKamerapoyta.SeuraaMuuttui) NUI:n kanssa.
- NUI: ISS-luettelon levennys iPad 58e779bdb; kamerapöytä dfa8e69a2 (laukaisin avaa etsimen, PT:n päätös) + kehityksen hitaus (2,5–3 min simulla, ei taantuma); kamerapöydän kuvat omistajalle ennen kytkentää.
- KS ISS-skanneri 658a582c1: Kiova + Odessa vanha | uusi | uusi+viivat → omistajalle ennen kytkentää (päätös 00.53). Simu varattu JU:lta.
- VS Louvre k65 (~09.30): yön kultajuovat pyramidin altaissa (vesimaski pois omien mallien alta) + musta allasvesi (taivasheijastus _OmaLuotain) → pari PT → KK.

## 4. ROOLIT
- LS (nollattu 06.4x): Louvre-pariteetti vs Alankomaat (lista OK/puuttuu, omat korjaukset, muiden puutteet PT:lle). Reitti Pariisista vasta pariteetin ja omistajan kuvien jälkeen (omistaja 23.53).
- SK: Louvren tekstit jo valmiit (27 teosta, 81 ympyrää). Aloitusselite "Louvre" (#4741, ranska/lahestyminen.json) on luonnos:true, aani tyhjä → AAMUKORTTIIN: tekstin hyväksyntä, sitten kertojaääni pysyvällä luvalla.
- ÄÄ levossa: odottaa luentakorttia (831 maalehteä). LR ja VS: Louvre (yllä). SiirtoS, KS, PK: 199-erät yllä.
- KK 45 %: nollaus vain omistajan kortilla aamulla; säästä KK:n kontekstia (vain hyväksyntää vaativat esikatselut, lyhyesti).

## 5. AAMUN KORTIT OMISTAJALLE (KK:lla)
1. Luentakehys: 831 maalehteä (~83 500 kr), PT:n suositus hyväksy. Ei generointia ennen vastausta.
2. Vapaalennon kierroslista vaalean kiven päällä heikko: ilman taustaa (KK:n suositus) vai paneelipohja.
3. Louvren aloitusselite (ks. 4).
4. Tiedoksi: Kiinan 5 taistelua, liuku-, vieritys-, uni- ja ISS-reittivideot, kaasuvipu, Kiina S6-1421.
5. KK:n oma nollauskortti.

## 6. KONE
Levy 36 Gi vapaana (vakaa); T7-simulevy 100 % → JU vapauttaa tilaa lukituksen jälkeen (pyydetty). proto-3d/lokit 44 G, _valmiit 25 G. Yösääntö 1 käännös + 1 simu.
