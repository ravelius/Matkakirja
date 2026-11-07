# PT:n luovutus 8.11.2026 klo 01.20 (konteksti 30 %, pehmeä raja)

Korvaa -20261107-2253:n PÄÄTÖKSET-, JUNA- ja AJOSSA-kohdat; sen OPIT ja aiempien OPIT voimassa. Viestit send_messagella session id:llä (osoitekirja). Työlista: tyolista.py / juna.py kirjoittavat scratchpad/asemataulu/data/talo:hon.

## JUNA 221 (JU, natiivi-backup julkaisija/juna-221 = 330a43515; TF VAIN OMISTAJAN SANALLA)
Omistaja 7.11. 23.37 "Ei vielä": TF 221 odottaa, että illan viat ovat mukana.
Mukana: 3bfd18d9a Lontoon talot + juoksupelin ulkoesineet (syy: _tyo/karttaseppa on T7-linkki, runner ei pääse; PR 6493 jälkitarkistus), 53dca9148 kameran loitonnus (VS), ffec8fdc4 + 2c12b920a nimet reunassa (NUI), 330a43515 pallon välimuisti 256 Mt + muistijarru (NS, 2a + V raja).
Odottaa:
- PK 22dc4c06b (keisari lähtee itse + latauskuvan ja alkulennon otsikot): kuvat katsottu, KK:n kortti omistajalle (junaan 221?). Huom: kääntymisohje poistui.
- PK 61f63adb9 lataus 44,1 → 27,3 s iPadilla, kuvatarkistus ok (ei LOD-poksahdusta); odottaa JU:n toistoparia -2 ja CPU-kopiotahtikoetta (muistihuippu < 4080). Junaan vasta PT:n kuittauksella.
- NS ASTC c8a70ad5e (natiiviseppa/astc-juna221, 330a43515 +1): huippu −226 Mt, lataus 761 → 64 ms, kuvat samat; sovellus +110 Mt (PNG-vara). KK:n kortti omistajalle; JU:lle vasta kortin jälkeen. +52 Mt vaatii käännösvaiheen erän.
- NS vaihe 1 (10604363c): huippu −200…−250 Mt; NUI-tarkistusajo JU:lla (nui-ajo.zsh); näkyvä hinta "Linssit latautuvat" 2,3 s → KK:n kortti omistajalle. 2b ei junaan.

## OMISTAJAN PÄÄTÖKSET TÄLLÄ VUOROLLA (kirjattu työlistaan)
- 23.06 vesi kokeena → 00.2x "Tee vesi heti omaksi kerrokseksi" (PT:n ikkunassa) → VS b258d6242 (linssiseppa2/vesikerros): Mac ok, iPad 30 s p50/p95 (omistaja: "liian pitkä mittaus" → 30 s) JU:lla kesken. Huom: Seine kauempana osin beige (2.204 auki). Parit KK:lla.
- 00.4x "Vaihda kokonaan usva ilmaan ja lisää puut" (PT:n ikkunassa): VS ilmaperspektiivi 98ee4c01e, parit KK:lla (PT: keskietäisyys haalenee voimakkaasti, säädettävissä). NUI puut 55540336f koko 2,5 kuitattu, parit KK:lla, iPad-muisti JU:lla.
- 23.13/23.2x lennoissa ei striimikartan tarkentumista (kaikki lennot); 23.25 "Kokeillaan ensin": NS striimi-karkea 681325154 kuvat KK:lla; lentosuunnitelmaa EI jaettu. Muistiero iPadilla JU:n jonossa.
- 23.40 kohokartta koko maailmalle; 23.38 topokartta säilyy kytkimen takana; 23.44 merenpohja liioitellaan (ETOPO 15″, lataus käynnissä). KS v5 maa valmis (ad87f5053), JU vie ämpäriin uuteen kansioon ja antaa osoitteen NUI:lle; meren t6 kortti KK:lla (meri 3D:ssä 0 m, syvyys varjona); jääkilvet punaruskeat (avoin). NUI kytkin b276782bd katsottu, jatko e9045150d.
- KS lähialue-1 b73f9232d (Gare Montparnasse laatikkokatto): kortti KK:lla.
- Omistaja kysyi PT:n ikkunassa pallon osista ja muistin valmistumisesta: vastattu (ei aika-arvioita).

## OPIT
- Väitä syy vasta todisteesta: JU:n ensimmäinen "ACL"-syy oli väärä (oikea T7-linkki). Kerro KK:lle korjaus heti.
- Kortin luku tarkistettava junaversiosta: ASTC +52 Mt oli laskettu koeversiosta, junaversio +110 Mt.
- Nollatun roolin aloitus voi käyttää vanhaa luovutusta (VS 8e2c08291 vs 5204dec28): tarkista Postivahdin sha ja lähetä ohje suoraan.
