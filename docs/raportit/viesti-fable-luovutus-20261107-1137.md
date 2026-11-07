# PT:n luovutus 7.11.2026 klo 11.37 (tili vvi@vvi.fi; konteksti 30 %, pehmeä raja)

Korvaa -1104:n AJOSSA-kohdan; -1104:n ja -1012:n OPIT, -0855:n ULKOISEN EHDOT ja ALOITUKSESSA voimassa. Id:t osoitekirjassa. Taulu Qo5w6Wk4JSYRwYbyf2fJrm; viimeksi viety tyolista 242, junat 191, muutoksia sen jälkeen viemättä: lue versio ja vie set file_path + if_version. Loki-PR:t: worktree /Users/Shared/Claude/wt/pt-loki-20261107-1049 (switch -c uusi origin/main, node tools/raamattu-kirjaa.mjs). Monitorit: codex-posti-vahti.sh, odottajat-vahti.py, levy alle 20 Gi (30 min, viritä uudelleen).

## OMISTAJAN PÄÄTÖKSET TÄLLÄ VUOROLLA
11.03 Pariisi "Odottaa" (loki korjattu 11.00:sta). 11.08 Taso läpi -kortti keskelle (PR 6450). 11.09 + 11.11 rikotut: kuvarivi ja pohjamuunnelma PERUTTU, automaattinen ruudukon avaus pysyy, kaikki loput; vain kuva Taso läpi -reitiltä seuraavasta juoksuajosta, jossa jotain rikotaan (botti 10 m ei riittänyt). 11.21 "jatka kaikkia töitä ja julkaise juna kun kaikki korjaukset valmiit" (PR 6451, 6452).

## JUNA 220: LÄHTÖ MINUN RIVILLÄNI "VIE 220 KOEVERSIONA"
Sisäinen koeversio kuten TF 219: ei ulkoisille, ei lukitusta, ei mainiin, ei korvaa korttia Pariisi valmis. EI "LUKITSE". OMISTAJA PYYSI JULKAISUA on välitetty JU:lle ja NS:lle. KK:n tulkinta omistajalle kerrottu; kaikki korjaukset = 09.49:n iPhone-korjaukset, Taso keskelle, 11.21:n alanapit ja valikko. Tila: julkaisija/juna-220 = 5fd6bbaba (a8b873e5d + f86344e8f + a89993465), ei käännetty.
| Kohta | Tila |
|---|---|
| Taso keskelle f86344e8f | JUNASSA, kuva katsottu |
| Valkoiset a89993465 | JUNASSA, Mac testikomennolla; iPad ja oikea 401/403 ajamatta; litteässä ilmakuvassa katot palavat osin valkoisiksi, KK:lle sanottu |
| Kysymys ja hinta cbae3153f | NUI: Mac katsottu, iPad JU:lla; kirjoittaa junapyyntöön "napautus todistamatta" (oikea sormi; iPad-ajurissa vain sovelluksen sisäinen napautus) |
| Alanapit ja valikko | NUI, ei vielä koodia, Mac iPhonen vaakakoossa |
| Lähizoom dd3a2e10f | lz-uusinnat JU:lla; iPhone mittaamatta |
| Lontoon kamera 8d8842ce6 (dd3a2e10f:ssä) | iPad 180 s kunnossa; ajo kertoja päällä JU:lla, jatkettava loppumisen ohi vähintään 60 s. Lontoolla ei ole kuvaesitystä ("esittely kuvineen" oli minun virhesanani) |
| Avoimen junan kuitatut, PK:n huudot 067210c0f | runkoon; äänet KK:lla |
| Vahtierä 41022d9db (KS) | VS kuittasi Valopohjan; Jousen Mac-kuva yrityksellä 2 (väliaikainen este, ei junaan). Jos ei synny, ei kolmatta: vanha suodin poikkeuksella "siirtämättä", ei pidätä junaa |
AUKI KK:lta: talot kauemmas (suositukseni: ei pidätä; jos sk-muisti2 ei selviä, juna ilman). Kortilla: yksi tarkkuus, Lontoon isot, kivet, ajon 49 sisältö.
PORTTI: kun 41022d9db on junassa, JU ajaa yöportin uudelleen; kultaiset eivät ole menneet läpi sitten ainakin 19.10. Pelkkä kultainen punaisena: rivi minulle ennen VIE-sanaa. TF-vienti ei aja tarkista.sh:ta, vain juna-ajo.sh. Sääntömuutos TF-reitin vahdeista vain omistajan sanalla, ei viety.

## MUU AJOSSA
1. **Yksi tarkkuus b221a28a1:** NS SEIS. Parit _tyo/natiiviseppa/yksi-taso/ ja tulos.md KK:lla suosituksella: näytä nyt, NS jatkaa vaihtohetkeen ja kallistukseen, ellei KK kiellä. KK:n vastaus odottaa; sen jälkeen sana NS:lle. Pariisi valmis -kortti ja ulkoinen TF odottavat omistajan kuvia (11.03). Lohko poissa, hinta: korttelit, pikkutiet, osa puistoista, Seine ohenee. Katsoin z12, z13, kauko, en z14.
2. **Ajo 49 KS:** EI AJOA ennen sanaani, ennallaan.
3. **Muurin kivet:** EI VIENTIÄ. kivisivu14 ISO iPad JU:lla, KK:lle korjattu ja odottaa tulosta, KK kortittaa.
4. **Talot säde:** sk-muisti2 5488bdd8b, kerran, iso iPad, vahti päällä. Jos vahti pysäyttää, ei uusintaa. Eiffelillä vain 81 Mt varaa.
5. **Lontoo isommaksi cbfb96542 + 832e5d24e:** i5 tb-matala täysikoossa katsottu, nimi pois. Muut parit en katsonut. Isolla iPadilla huippu 3844 Mt. KK:lla, kortti häneltä, ei junaan ilman.
6. **PK:n aloitusviesti Postivahdilta (tarkista että meni):** vartijakopiot tee-lukijaaanijalki.mjs ja tee-valmisluennat-kultainen.mjs; JuoksuV4Maailma.cs:1665–1666 puomi tau 0,08 (hajoaa noin alle 15 fps, dt-raja jäljittämättä) ja :1069; ruudukon kuva.
7. **Liikepohja:** kommentin 10–120 fps pitää vasta tau ≥ 0,121 (VS). MuseoPulu:174 tau 0,12 rajalla. Ei tilattu.
8. **Levy** 29 Gi, JU siirtää julkaisija-kivet-juuren kivisivu14:n jälkeen.
Työlista: Juoksupelin ovet ja Lisää nähtävyyksiä Codexilta yhä ilman tuoretta tilannetta. Muurin kivien rivi ja Pariisin tarkka alue -rivi: koukku lukee sanan "valmis" Pariisi valmis -kortista, ei oikeita valmiita.

## OPIT
- Älä myönnä vahdin poikkeusta katsomatta, mitä seuraavat vahdit tekevät: JU kertoi Liikevahdin vasta poikkeuksen jälkeen, ja jouduin perumaan Kyllän. Kysy koko ketju ensin.
- Koeversion lähtösana on eri kuin lukitus: kirjoitin ensin LUKITSE 220 ja korjasin kolmeen paikkaan (KK sanoi "ei lukitusta").
- Roolin raportti voi olla ohi: kaksi viestiä meni ristiin perumisen kanssa; lue jono ennen kuin vastaat. Sha:t tarkista (JU:n e9426d836 oli minun lokini).
- 30 % tuli nopeasti kuvista: avaa vain tarvittavat, parit ovat isoja.
