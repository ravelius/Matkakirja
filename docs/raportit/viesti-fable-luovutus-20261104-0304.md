# PT:n luovutus 4.11.2026 klo 03.04 (konteksti 30 %, pehmeä raja)

Edellinen: viesti-fable-luovutus-20261104-0219.md (cc8e7e186); sen yö-ohje ja opit voimassa, tila korvattu tällä.
Vahdit Monitorilla 30 min: python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py | grep --line-buffered -E 'ODOTTAA|TYHJÄKÄYNTI|TILA\|.+' ja /Users/Shared/Claude/hooks/codex-posti-vahti.sh. Viritä heti.
Omat ajastukset katoavat nollauksessa: viritä uudelleen: 03.37 (NS:n todiste, väri, KK:n valinta), 04.02 (JU aloittanut), 05.17 (kuvat tulossa).
YÖTILA: omistaja nukkuu, KK hyväksyy puolesta (ei TF, ei junan lukitusta, ei ostoja, ei asetuksia, ei yli 3 % generointia). Kuvat PT:n kautta KK:lle; katso itse ennen vientiä. Lista: /Users/Shared/Claude/proto-3d/lokit/kk-peli-a94d8e7fb-20261103/KORJAUSLISTA.md. KK:n id local_d5f31591. KK nollautui noin 02.57, sen tila on sen aloitus.md:ssä.

## ENSIN: AAMUN KOKO PARIISI (ei junaan; kuvat iso iPadilta viimeistään 05.30)
1. **JU ajaa nyt k28 984342737 iso iPadilla** (alkoi noin 02.56, valmis noin 03.20; lokit/julkaisija-k28-iso-984342737/). Tämä on VARAKUVA. Tuotava samalla: pari k-laaja vs 2029: python3 -I lokit/pt-laaja-pari/laaja_pari.py <k-laaja.png> <tunnus> 4.4, malli k24-vs-2029.jpg (2029 1× 5,4 m/px | k-laaja skaalattu; alkup. noin 4,4 m/px maamerkeistä). KK: k28 uudelleen samoista kohdista kuin k24.
2. **NS:n f5c1f14b0-todiste iPadilla noin 03.32** (lokit/julkaisija-reuna-iso-f5c1f14b0/; läiskät 0,30/0,21/0,17/0,15/paluu, 5+ kohtaa). NS antaa rivin PT:lle ja VS:lle.
3. **VS tekee lopullisen yhdistelmän, sha + sk JU:lle ja PT:lle viimeistään 03.45, JU aloittaa viimeistään 04.00** (menee PK:n sarjan edelle). Sisältö: k33 57e022c35 (k29 + f5c1f14b0, isot katot pois; KK 03.01 OK) + väri + KS:n lopullinen **932078810** (haara karttaseppa/pariisi-nimet-220; puut v3, 6 puutarhaa, väistö, Concorde ja Seinen latvus, nimet). VS:n k34 0f8fcb65c:ssä oli vielä vanha 035dba3ea; käskin vaihtaa, TARKISTA lopullisen shan merge-base (wt/proto-karttaseppa-lahitaso). Merge-tree 57e022c35 + 932078810 puhdas.
   Jos KS ei ratkea 03.30:een: pois, ajetaan silti. Jos NS:n todiste ei ole puhdas: k28 jää aamun kuvaksi, kerro JU:lle ja KK:lle. Jos VS ei ehdi: 4d2c01ba1 (k28 + f5c1f14b0). EI 542e5cbf6, EI 1a8f03720.
   VÄRI (KK): kerroin k28:n iPad-kuvista, jos katot yli 5 R-yksikköä 2029:ää lämpimämmät; jos lukua ei ole 03.35, Macin 0,93/0,96/1,03; jos iPad ei lämmitä, ei muutosta. VS mittaa.
   sk-rivit VS:llä: a95-silta-katu, y-eiffel, y-pantheon, y-opera, y-nd-louvre, y-vene-pont-royal, aja 48.8650 2.3378 0.012 2, aja 48.8440 2.3597 0.012 2, Montmartre (nimi näkyy), r-0-21 ja -paluu.
   JU vie KS:n kuvat (isoisa-2029/esine/pariisi/puutarha-*.png, esine/puu-60-v3.png) VAIN laitteelle kartta-osat-kansioon. Muisti yli 4080 Mt = VIKA, k28 jää. Yhdistelmässä on useita ajamattomia muutoksia.
Kelpaa aamuun (KK): häivytysvyö 0,13, länsiraja 1 200 m (lon 2,223; EI peruttu), Tuileries-koodiversio, Jussieu ja Austerlitz vaaleina. Ei aamuun: k32 e8ec53782 (ratapihat), vesirajan portaat.

## ODOTTAA KK:TA
Tuileries v2 15l kolmio-tuileries-v2.jpg (toimitettu 03.03; suositus pidetään, ei aamun kerroksessa). Kaikki muu kuitattu.

## JÄLKEEN AAMUN (anna vasta silloin)
- Materiaaliarkit 16a–c: KK 02.55 suunnaksi vain z16–17; karttakoe z16, z17, saumat, koko, muisti (osio 16a–c). Ei uusia ottoja ennen koetta. Kuka: VS + KS.
- VS: ratapihat (k32), palatsisääntö vain nimetyille (osio k33), portaat 2,3221/48,8633 ja 2,3245/48,8625, Plantes-kermaläiskät.
- KS: Hyatt tarkalla nimellä (ei Hôtel-alulla; tarkista 76d11201a), puutarhakoosteet k28/k29-pohjalla, Champ-de-Marsin siivet tehty koodilla, katupuiden 40 m:n raja: Seinen rivit seuraavasta parista.
- NS: haamut 0,13 iPadilta k28:sta; kulu vierityksestä k28:lla (z14–15 mediaani 236–305 ms, huippu noin 1,1 s; myöhästyminen, ei pysähdys, päätelty).

## JUNA JA MUISTI
- PK be5632bdb (palkisto + taivas, 0d688683a:n päällä): Mac 8/8 JU:lla ajamatta, katso kuvat. Palkisto oli junaa estävä VIKA (raja 3,9 m, palkki 3,96 m). iPad-sarja (sali 1+2, 40 x, Pariisi muistilokilla) pidossa, Pariisin jälkeen. TF 217: koodin mukaan sama palkisto ja vuoto, ei mitattu; KK:n aamulistalla. Rivit 71–91 osan A juoksusta "massassa 1": kuvaa pelaajan tasolta ei ole.
- PK palvelijat v11 52831ac12: ajamatta, JU:n jonossa be56:n jälkeen. JuoksuHahmo-jono Geometry+2 koskee myös Puyita: PK katsoo. KK v10: sirpaleet, ämpäri ok, lätäkkö ei.
- LAV v125: Wumenin juova lähes poissa, pieni läiskä auki, ei vientiin; 5d kiilakoe, kuva JU:lta Pariisin jälkeen.
- k24 iPad hyväksytty k24-pinnalla (KK): saumat 48,8503 ja 2,3071, hiusviiva, Alma, vinjetti 0,30–0,15, muisti 3512 Mt.
- Tripo palvelijatar viimeisenä JU:lla. NUI levossa.

## Nollaukset yöllä
JU d81643b7d, KS f6d1a1a20 (viim. luovutus), VS fdb462205, PK 9d06e10df, NS c891939cd. KK 02.57. Luovutuksista puuttui taas tuoreita käskyjä (VS, KS): lähetin uudelleen; tarkista jokaisesta nollauksesta.

## Opit
- Viesti voi jäädä nollauksen alle, vaikka "delivered": tarkista luovutus grepillä heti Postivahdin rivin jälkeen.
- Käskin VS:ää viemään kuvan KK:lle: väärin, kuvat PT:n kautta. Länsiraja ja 2,4609 sekoitin: tarkista rajaus ennen kuin yhdistät kaksi vikaa.
- Sha ei löydy Matkakirja-checkoutista: natiivit shat vain natiivirepon worktreessä (wt/proto-*); tarkista siellä.
- date ennen jokaista aikaa viestissä (kirjoitin 02.27 ja 02.5x arviosta).
