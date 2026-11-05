# Lavastajan luovutus 5.11.2026 18.31 (konteksti 31 %) — LUE TÄMÄ, sitten muuri/KORJAUS.md loppu

Korvaa -1801:n. Ei vientejä. L = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/yleinen/lattiakoe. EI VIENTIÄ ennen PT:n sanaa ja PK:n vahvistusta. Mac-ajot: Raamattu 10.5 (yksi kysymys, noin 5 kuvaa, rivi "mitä tämä ratkaisee", JU:n vuorolla).

## Tila
- Paras juuri: katot-v125/koejuuri-lattia15 (lattia14 + tee15.py). Valkoinen juova poissa: renkaan koko ylöspäinen sokkeli ja tausta lod1/2:n y≈0-sokkeli (225 014 m²) V4_lattiaksi. Kuvat L/kuvat15-koe.
- koejuuri-lattia16 (tee16.py) EI kelpaa: uusi leveä lila-harmaa poikkikaista (L/kuvat16-koe/s-rengas-pohj), syy auki. Älä jatka siitä.

## PT:n käsky (18.2x), auki
Sauma rengas|tausta z noin 675 korjataan ennen vientiä, ensin mallista. Kaksi harmaata poikkiviivaa selvitetään; jos eri vika, kerrotaan erikseen.
PT sai 18.31 suosituksen (jatkopäätöstä ei vielä luettu; tarkista list_events tai posti): lattia17 = lattia15, renkaan kolmiot leikataan z 675:een ja reuna y 0:aan, vanhaa kerrosta ei poisteta.

## Tiedossa
- Sauma: rengas ja tausta limittyvät z 661–675, ja rengas on 6–50 cm päällä. Pisteiden lasku (lattia16) jätti katkoviivan ja laattarivin katkot. Taustan lattia päättyy z 675:een, palarajat vain 670:een.
- Väriero (tausta 208/198/178, rengas 226/217/212) ennallaan. Taustalla on UV1, renkaalla ei; syy todennäköisesti leivonta, ei todistettu. Korjaus vaatisi leivonnan: PT:n päätös.
- Viivat: kauempi hävisi lattia16:ssa, lähempi jäi. Kerrosselitys ei riitä. Ei tiedetä, liikkuuko viiva kameran mukana: s-rengas-pohj-20:ssa pelaaja jää maan alle (sijoita y 0, maasto siellä y 3), joten koe ei ratkaissut. Uudessa kokeessa siirrä kameraa etelään tai käytä kohtaa, jossa maa on y 0.
- PUUTE-rivi joka ajossa (häivytyksessä 1): ei näkynyt kuvissa; JU ehdottaa odota-maailma-aikarajan lyhennystä, koska se vie noin 90 s/ajo.
- Skriptien sudenkuoppa: samalla materiaalilla on monta primitiiviä; dict materiaalin nimellä poimii vain viimeisen (tee15.py tekee oikein).

## Jonossa, ei aloitettu
PK:n havainto (-87,5; 302,5), KORJAUS.md. S-rengas-itän iso harmaa vino levy (V4_harmaa, sama jo lattia14:ssä). Muut verrokin viat jäävät PT:n sanalla.

## Levy
17 käyttämätöntä koejuurta siirretty T7:lle (proto-arkisto/linnanrakentaja-katot-v125), tilalle linkit, _tyo/linnanrakentaja 11 → 8,2 Gi. Lattia14:n ketju (lattia13, yhd, yhd3, levyt) on sisäisellä levyllä. Lattia15 ja -16 ovat sisäisellä levyllä (noin 240 Mt).

Apuskriptit L:ssä: tee15.py, tee16.py, aja15.zsh, aja16.zsh, sk15-koe.txt, sk16-koe.txt. Scratchpadin mittaukset (sauma15, kaista16) katoavat; tulokset KORJAUS.md:ssä.
