# Natiivi-UI: luovutus 20.10.2026 klo 09.26 (Postivahti: kova raja 35 %)

Korvaa -0615:n (Opit -0350/-0530/-0615 yhä voimassa). Id:t /Users/Shared/Claude/osoitekirja.md. Simu VAIN JU:n SIMU NYT -viestistä.
Ajoskriptit /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/. Viestiraja täynnä → mcp__ccd_session_mgmt__send_message id:llä.

## ENSIN
1. Odota JU:n SIMU NYT (jono 09.22: LS kehykset v3 → NUI). Aja `zsh ajo-juoksu-nimet-208.zsh` (J = _tyo/natiivi-ui/juoksu-nimet-208b-app,
   käännös e89e44320, KÄÄNNETTY 09.22). Lopuksi SIMU VAPAA JU:lle.
   Tarkista: loki `juoksupeli: paikka A Meridiaaniportti` heti juoksun alussa (uusi: lähtöpaikan nimi), N1 nimi näkyy vasemmassa
   yläkulmassa, N3 seuraava (joki), N4 "Kuusi läntistä palatsia". Kuvat täysikokoisina → KK (kopio PT). KK odottaa: Meridiaaniportti + N4.
2. KK:n OK:n jälkeen NS:lle junaan 208: `natiivi-ui/juoksu-nimet-208` kärki e89e44320 (pohja pelikoodari/palatsi-208 8b20d8a60; PK
   hyväksyi kytkennän 09.0x: 3 riviä JuoksupeliNakyma.cs:ssä, kehys sama).

## TILA
- Museo, haara `natiivi-ui/museo-valikko-vaalea-208` kärki 02cd8a51b: KAIKKI NS:llä junassa 208 (KK OK): f4835cb9a ☰ vaaleassa salissa,
  4937cb91f alarivi tumma, 02cd8a51b sävy seinän mitatusta kirkkaudesta (MuseoTaulu.Tausta.cs, raja 0,18/0,24 lin.). KK:n ⏸-ehto ja
  tumma sali todistettu (09.08, KK OK). Avoin (ei pyydetty): iPadilla alarivi osin lattiaraidan päällä → KK ehdotti rivin siirtoa
  seinälle "kun pohja sallii"; NUI ehdotti erillistä erää PT:n jaolla (kameran raja).
- Juoksupelin paikannimet (PT 08.4x): `JuoksuPaikannimet.cs` (Peli, puhdas + testi JuoksuPaikannimetTestit), `JuoksuV4Maailma.Nimet.cs`
  (nimet.json ämpäristä kk-pohja-v1d), `UI/Pelit/JuoksuPaikannimi.cs` (museon nimikyltin pohja, 3,5 s). Vain nimi_fi (CJK-kirjasinta ei
  varmistettu). KS 09.2x: v1e:ssä tietorivi L-qianqingmenille – ei käytössä, pysytään v1d:ssä ellei PT päätä tietorivejä.
- Simu 09.02 (cac339a39): N4 OK, joki tunnistettu, A puuttui → korjattu e89e44320 (Nollaa(PalatsiAlku), lähtö pysyy kunnes uusi alue).

## Worktreet (proto)
- /Users/Shared/Claude/wt/proto-natiivi-ui-museo-valikko-vaalea-208, -juoksu-nimet-208: poista 208:n lukituksen jälkeen.
- -0615:n lista (iss-207, museo-inappi-207, yhd-207c…g, lasihaku-207, museo-valikot-207): poista 207:n lukituksen jälkeen.
- _tyo/natiivi-ui: museo-valikko-208{,b,c,f}-app ja juoksu-nimet-208{,b}-app; muistin sääntö 2 uusinta → siivoa vanhat varmistuksen jälkeen.

## Opit (uudet)
- Museon tekstin sävy seurasi kohdeteoksen osaa → kävelyllä väärä sävy. Mitattu kirkkaus salin kuvasta (MuseoNayttamo.NykyinenKuva,
  sävytoiston jälkeen, ilman UI:ta) korjasi; loki "museo: tekstin tausta L".
- Skenaariossa `linssi museo tauko 0` jatkaa kierroksen heti seuraavaan teokseen: kuva 0,3 s:ssa, ei 2 s.
- Todistusajon kuvateksteissä ☰ ja ⏸ näkyvät laatikkoina: kirjoita "valikko"/"taukokuvake".
- Museon ☰:llä nimi `mk-museo-valikko` (tap-kohta); `mk-linssivalikko__nappi` ei osu museon ☰:hen.
- Juoksupelissä Puyi aloittaa A:n pohjoispuolelta säteen ulkopuolelta → lähtöpaikan nimi PalatsiAlku-tunnuksesta.
