# Päätoimittajan luovutus 17.10.2026 klo 09.55 (konteksti 30 %; tili vvi@vvi.fi)

PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589. Id:t /Users/Shared/Claude/osoitekirja.md.
Asemataulu https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm; paikallinen talo/junat.json + tyolista.json ajan tasalla 09.5x.
Edellinen luovutus: viesti-fable-luovutus-20261017-aamu2.md (#4785). KELLO AINA `date +%H.%M`.

## 0. Heti aluksi
RC päälle, odottajavahti-Monitor (30 min, uudelleen joka vanhenemisella), get_usage self.
Omistaja on hereillä ja aktiivinen KK:ssa. KK on 39 %:ssa, ja sen nollaus tehdään vain omistajan kortilla (KK:lle muistutettu 09.50).

## 1. JUNA 199 VALMIS
BUILD 6339b1aec (runko bc228f5d9), M 61697d9a9 (#4788). iOS TF 09.37 → sisäinen 09.41 → ulkoinen 09.42; Mac 1.1 (199) 09.50. TF 198 vanhennettu.
KK:lle kerrottu. Asemataululla rivi "TF 199".
Sisältö: uni pois, Kiina pelaajille (NS teki Kesken = false omistajan 01.25 päätöksen mukaan), 2 342 luentaa, Louvre (Nike/Venus + SK:n tekstit + Rodin),
seepia takaisin, ISS-skanneri oikea maasto + viivat (omistaja 08.57), ISS-himmeä, iPad-luettelo 720 pt, pystyvipu, kompassin LEVEÄ keila
(omistaja 08.59 kumosi kapean 69178ded7, revertattu), latauskuvat v2, UTM-kaatumiskorjaus (PK bbad4c6cb). Sovellus +33 Mt (skannerin korkokuvat).

## 2. JUNA 200 (kertyy, ei julkaisua ennen omistajan pyyntöä)
Runko natiiviseppa/juna-200 = 003a238d1 (testit olivat kesken, NS nollattu 89b23a858 → seuraaja raportoi).
Sisällä: PK valoisa-kohde 3faa6ffcd, antimeridiaani 27b4a5292 + v2g dc177cc58 (KS:n S2-indeksi v2g ämpärissä).
Tulossa (kuitattu): VS aamukaista 0cd7ae1a7 (ISS-Maan tasaisen oranssi aamuhämärä koko pinnalla, NÄKYY PELAAJILLA TF 199:ssä;
selvitys KS docs/raportit/karttaseppa-oranssi-ranska-20261017.md) → pari minulle. NUI kamerapöytä dfa8e69a2 + PK SEURAA a03177279
(kuvat omistajalle VASTA kun oranssi korjattu; uusinta samalla Pariisi-skenaariolla). NUI cupola-ohita2 dc48eb887 + kehys-kaaro 9365854c2 (uusinta) → samaan kuvapakettiin.
LS veistokset listaan 26c8d96a5 + 7713b7968 (simu käynnissä). Louvre: LR k65 (vienti pyydetty) + VS k67 (vesi piripintaan) samaan pakettiin.

## 3. OMISTAJALLE TULOSSA (videot/kuvat PT → KK)
- KS: Punaiset kalliot 208 -väestövideo (25d68cbad, PK:n armeijat mukana) – lupa annettu 09.18, JU:n jonossa.
- PK: web-ocean-meri raketin laukaisuun (omistaja 09.30 "Kyllä, kokeilu"), 191b2e8d8 JU:n käännösjonossa → vertailuvideo + iPhonen ruutuaika.
- NUI: Isoisän uni uusi versio (KK:n tavoite: 20–30 s, unenomainen, kuiskaukset SK 5a7310001 #4789, liukenee kartaksi) → video. Ei kytketä ilman omistajaa.
- VS: valas K6 (k4/k5 ydin yhä tiheä, väärä kerros), aamukaistan jälkeen.
- LR: Tivoli (omistaja 09.46) – suunnitelma ja havainnekuvatilaus #4790 47b8950ff. LUE ja hyväksy/ohjaa; generoitujen kuvien määrä KK:n kortille ennen generointia.
  Tivoli 1873 tarina-aiheena isoisälle = PT:n päätös, kun SK on tarkistanut kaanonin (docs/tarina.md).

## 4. PEKING
V7 (p361v7) omistajan piilokaupungissa 09.50 (uusin.json, LS + JU); KK:lle kerrottu. KTX2 T7:llä. VIRHE: V5–V7 jäivät viemättä 16.10.
→ muisti peking-paketit-amparin-heti: jokainen LS:n hyväksymä Codex-paketti viedään samana tuntina + rivi KK:lle. Codexin jono: V8a leikkausrako, V8b vesistöjen korkeudet, V8c G33-kiveys.

## 5. MUUT
- codex-odottaa.py: lisätty kuitatut.txt (käsin kuitatut, kun vastaanottaja ei ole roolin nimi). Postivahdille ohje.
- HYDE: 3.2.1 käytössä; 3.3:n NC-väite vain lokissa, ei muutettu. DANS robots kieltää botit → käsilataus vain jos kokeilu hyväksytään.
- JU poisti muiden roolien appeja (sääntörikko, huomautettu). Levy ~36 Gi 09.4x; lokit-siirto 48 h: vain 7 kansiota (0,7 Gt), ei ajettu. App-kopioiden siivous jos < 25 Gi.
- Tyhjäkäynnillä levossa: ÄÄ, SS (ei luvallista erää). SK sai unen kuiskaukset (valmis).
- Muutoslokin vientiraja: ≤ 3 lausetta / 280 mrk.
