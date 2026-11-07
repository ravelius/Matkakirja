# Pelikoodari: luovutus 07.11.2026 klo 19.01

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (pehmeä raja). Vanhat työkalut: `git show 5e333b4e7:docs/raportit/viesti-pelikoodari-luovutus-20261107-1820.md` kohdat 3 ja 4.

## 1. Seuraava työ: kulkukartta, kun muurin juuri lukittuu (PT 18.4x: juuri KK:lla omistajalle)
Putki valmis: `4d30e4bb9`, haara `pelikoodari/kulkukartta-ajo` (natiivi-backup), työpuu `/Users/Shared/Claude/wt/proto-pelikoodari-kartta`, junan kärki `901e4004b` + 1 commit. Ei junassa.
Ajo: päivitä ensin pelin malliversioiden vakiot juuren mukaan, sitten
`nice -n 15 /opt/homebrew/bin/python3 tyokalut/kulkukartta_ajo.py <ulos> /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kulkukartta/osasarja-v8.bin --juuri <lukittu juuri>`.
Tulostaa vertailun Resourcesiin; tiedostot vasta `--vie`:llä. Älä aja palkki5:llä. Vaikutus mittaamatta: LAV:n sääntö täyttää 2 833 m², ei lisää seiniä; levyt3:n kävelyssä (`kulkukartta/levyt3-kavely.txt`) 6 ovea siirtyi, joten ovet ja kynnykset on katsottava. Pelissä ei ole ajettu uudella kartalla.
Koeajo nykymalleilla `_tyo/pelikoodari/kulkukartta/ajo-nyky/` (`loki.txt`): ovet, esineet, rajat tavulleen samat, jalkojen pinta sama. JuoksuKulku eroaa 49 ruudussa kohdassa (281,8; 470,2): 颐和轩:n vanhat koneen portaat poistuvat, kuten `3f9ea5f31`:ssä oli tarkoitus. Siksi vanha ohje "lisää kerros, älä vie uudelleen" ei enää päde. Tarkastelukierros on päivittämättä 4.11. jälkeen: 1597 -> 1592 pistettä, suurin siirtymä 20,5 m; kierrosta käyttää vain tarkastelu.
`--juuri` on kokeiltu vain polun osalta saanto2:lla, ei koko ajolla. Osasarja v8 on T7:llä linkin takana; v13 on vanhempi päivältään, ja koeajo v8:lla toisti nykyiset tiedostot.

## 2. Odottaa
Lontoossa ei kohtaa minulle (PT 18.4x); St Paul's on VS:llä. Yhteisajon kohdat: 1820 kohta 3. Juoksupelin ovien tila on työlistalla (PT:n pyyntö, tehty).

## 3. Valmis tällä vuorolla: T7-lokit NAS:lle (PT:n sana, JU:n vuoro)
Siirretty 899 kansiota, 73,6 Gi, 883 s, virheitä 0. T7 vapaa 164 -> 238 Gi. Polku `Matkakirja-arkisto/lokit/<nimi>`, ei linkkiä (Raamattu 12.19, PT). Jälkitarkistus: NAS:lla 899/899, T7:lla 0, linkkejä 0, NAS-linkkejä yhä 612. Raportoitu PT:lle ja JU:lle. Loki `/Users/Shared/Claude/_levy/lokit-nas-aja-20261107.loki`.
74 kansiota jäi, koska `docs/raportit` viittaa niihin. Muualle jääneet viittaukset eivät estäneet siirtoa, eli muistiinpanojen ja lokin polut näihin 899 kansioon eivät enää toimi.
Työkalu `tools/levy/siirra_lokit_nas.py` `54fb93a8a`, haara `origin/pelikoodari/lokit-nas-siirto`, EI mainissa (PR tekemättä, PT ei pyytänyt). Testi `/Users/Shared/Claude/_levy/siirra_lokit_nas_testi.py`.
Sana oli `3fabbf3a2`:lle; ajoin `54fb93a8a`:n, koska PT vaati pysähtymistä ensimmäiseen täsmäysvirheeseen. PT:lle kerrottu.
Rikki lokit-kansiossa, eivät tästä siirrosta: `valoseppa-uusin` ja `olavinlinna-uusin`. Ei korjattu.

## 4. Opit
- NAS (NFS) tekee jokaiselle kopioidulle tiedostolle ja kansiolle `._`-kylkitiedoston: vertailu ilman niiden ohitusta näyttää kaiken eroavan.
- `proto-3d/lokit-symlinkit`-kansiota ei ole; linkit ovat `proto-3d/lokit`:ssa.
- zsh: `echo ======` kaatuu (`=cmd`-laajennus).
