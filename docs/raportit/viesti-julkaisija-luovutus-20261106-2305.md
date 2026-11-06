# Julkaisija: luovutus 6.11.2026 klo 23.05 (konteksti noin 30 %)

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt. Korvaa aiemmat luovutukset. Id:t: /Users/Shared/Claude/osoitekirja.md.

## ALOITA TÄSTÄ: jono pyörii irrotettuna, viritä odottimet tulostiedostoihin, älä käynnistä uudelleen
Tarkista ensin `ps -p` ja jonolokin häntä; osa on voinut jo päättyä, ja tulos on silloin kuittaamatta.
- L2: KS 35 00dea49d1, pid 33670 (ks35c-jonossa.zsh), 30 kuvaa, raja 45 min. Tulos T/ks-yhteinen35.tulos. Kuittaus KS:lle: kuvat, Shader error, error CS, PUUTE; kerro kun valmis. Ei tallenteita.
- L1 järjestyksessä, kukin odottaa edellistä pid:llä:
  1. NS tyhjat-b ja -c ccb2dbc2f, pid 31695, tulos T/ns-tyhjat-bc.tulos, 4 kuvaa kumpikin, kansiot lokit/natiiviseppa-aloitus-tyhjat-{b,c}-ccb2dbc2f. Palauta NS:lle kansiot, kuvamäärät, virheet.
  2. NUI kk-2 51f9fad72, pid 97248, tulos T/nui-kk2.tulos, 18 kuvaa, lokit/nui-aloitus-kk-2. Kuittaa kansio NUI:lle.
  3. LAV levyt7v 35140432d, pid 5238, tulos T/lav-levyt7v.tulos, 4 kuvaa, _tyo/linnanrakentaja/muuri/aukot/kuvat-levyt7v.
  4. LAV levyt7s, pid 11652, tulos T/lav-levyt7s.tulos, 2 kuvaa, kuvat-levyt7s.
  5. LAV levyt7r ja levyt7u, pid 24450, tulos T/lav-levyt7ru.tulos, 9 kuvaa kumpikin, kuvat-levyt7r ja kuvat-levyt7u. Kuittaukset LAV:lle riveinä: kuvat, 404-määrä, virheet.
- LEVY: PT:n käsky: rivi PT:lle, kun vapaata on alle 35 Gi, niin PT nimeää kohteet (23.04: 47 Gi). Viritä odotin. lokit/-kansion 10 Gi jää yösiivoukselle (PT, 12.9). Älä poista lokit/-kansiosta.
- TF: EI lähde ennen KK:n korttia "Pariisi valmis" PT:n kautta (omistaja 17.33).

## TILA
- Junarunko julkaisija/runko-219-muisti = 1104d0994 natiivi-backupissa, ei käännetty junakäännöksenä; ei natiivi-backup/masterissa. iPad-skriptien RUNKO osoittaa d092f48cc:n käännökseen. iPad vapaa, runko d092f48c.
- NS Mac-16 ja iPad-rakennustärinä PERUTTU (omistaja 21.30). Ei ajeta.
- PT 21.4x: kun kaksi ajoa odottaa, L1 käyttöön heti.
- wt/julkaisija-postilaatikko on nyt ilman tiedostoja (--no-checkout; 5,4 Gi säästö). posti.zsh tekee commitin indeksiin; testattu ilman pushia, ei vielä oikealla postilla. Älä aja siellä git checkoutia.
- Jäivät: wt/julkaisija-pariisi-219 (iPad-skriptit viittaavat), wt/julkaisija-yhdistelma-218 (commit ei etähaarassa).

## TULOKSET TÄLTÄ VUOROLTA (kaikki viety tilaajille; kuvia en arvioinut)
KS 31 (66+25), 32 (32), 33 (1+20), 34 (33+24), 34b (14). NS liiku, liiku-2 (PUUTE 1), liiku-lento, oleelliset nimet, aloitus-tyhjat, nimitaso x2. NUI aloituslento, -2, mittaus a-d, jumi-vertailu, jumi-korjaus, kk. LAV levyt6, levyt7, koeleivonta + levyt7b (404 = 4 kaikissa). VS:n varjostin 3d6e35696 ei kaatanut käännöstä.

## OPIT
- Kaikissa illan ajoissa 11 Exception-riviä: Unityn editorin hakuindeksin ArgumentOutOfRange (SearchInit) ja Cesium-yhteys, ei pelikoodia. Lue rivit ennen kuin nimeät ne: kerroin KS:lle ensin vain Cesiumin.
- Älä käytä SIGSTOPia jonon järjestämiseen: pysäytetyn silmukan lapsesta tulee zombi, kill -0 onnistuu siihen, ja odottaja jumittuu (L1 22.59-23.05). Lisäksi tila oli ehtinyt muuttua minuutissa tarkistuksesta: a7c4d3cf3 ajettiin NS:n pyytämän järjestyksen vastaisesti. Järjestä uudelleen vain odotussilmukassa olevat ajot.
- Tarkista tila uudelleen samassa komennossa juuri ennen muutosta. Muokkaa vain uusia skriptitiedostoja, ei ajossa olevaa.
- ks-yhteinen-ajo.zsh on L2, ks-yhteinen-l1.zsh on L1. Tallenteet ja txt:t kopioi itse lokikansioon: mac-ajo.zsh ei kopioi niitä. Levyn säästämiseksi siirrä tallenteet mv:llä (kuten KS 34).
- Aikaraja: oletus 30 min, mitoita (muisti ju-aikaraja-ja-l1-rinnakkain).
- Lukkokilpa ei takaa järjestystä: kun tilaus sanoo "ennen X:ää", odota pid:llä.
