# Natiivi-UI: luovutus 6.11.2026 klo 23.2x (konteksti yli 25 %, pehmeä raja)

Itsenäinen: korvaa kaikki aiemmat. Oma id local_43962c89-fc14-4098-9dd7-6153133ffcea. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364, NS local_99130238-aa54-4a29-bcc9-7a023584944b.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup (ei origin). Tiedot: proto-3d/lokit/nui-tahtikyltit-20261106/tulos-nui.md, kaksi viimeistä lukua. Ei omia ajoja käynnissä.
YÖN SÄÄNTÖ (omistaja 23.07, PT): vika ei ratkea kahdella yrityksellä tai noin 30 minuutissa → kokeen osa pois tai edellinen toimiva tilalle, rivi KK:lle (vika, mitä kokeiltu, suositus) ja seuraavaan työhön.

## Odottaa (tulee viestinä tähän id:hen)
KS: ajo 37 (ajon 36 jälkeen; ei vielä tilattu), mukana f29ff0335 ja lista _tyo/karttaseppa/lisa-kyltti-ylitys-35.txt (8 tallennetta, kyltti35-*). KS kertoo lokikansion.

## 1. SEURAAVA, kun ajo 37 valmis: kyltin nopea ylitys
Korjaus f29ff0335, proto-haara natiivi-ui/kyltti-nopea-ylitys, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltti-ylitys (ae497b124 = mittausrivit, f4ad1b95b:n päällä). Liikkeessä kyltti häipyy UI:n alla vasta 0,3 s osuman jälkeen; levossa heti (KylttiUiEste.Piiloon). Vain NostotKartalla; MalliKyltit ja KaupunkiPallot ennallaan. Testit 635/635, käännös 0 virhettä, AJAMATTA.
Syy: PT käski katsoa Galerien oikealla nopeudella. Videota ei voi katsoa silmin, joten mittasin laatan näkyvyyden joka kuvasta: ajossa 34 kyltti kävi 0–6 %:ssa ja palasi, alle 50 %:ssa 0,08–0,32 s. Välähdys on päättely, ei silmin nähty; PT:lle kerrottu näin.
Arvio ajosta 37, lokit/nui-tahtikyltit-20261106/:
- python3 -I kyltit33.py <lokikansio> (vaihdot; odotus: gr-20, gr-14, gr-10 eivät häivy enää lainkaan, gr-8 häipyy myöhemmin)
- python3 -I kayra34.py <lokikansio> kyltti35-gr-20-p 38 58 (näkyvyyskäyrä; vaihda tallenne ja kuvaväli)
- python3 -I arkki34.py <lokikansio> ulos-etuliite (kaikki vaihdot arkeilla, joka 3. kuva)
Jos ei toimi: yön sääntö (PT antoi yhden korjauksen): f29ff0335 pois, rivi KK:lle. Toimii: 3 riviä PT:lle. Tunnettu raja: hieman yli 0,3 s:n ylitys voi yhä himmentää hetken.
Kyltit on PT:n kuittaama kokeena (39 vaihtoa, ajot 33 ja 34).

## 2. Valmiit tässä vuorossa
- Intro 51f9fad72 (natiivi-ui/aloituslento-mittaus-219): kuvat lokit/nui-aloitus-kk-2 viety KK:lle ja sha PT:lle. Viisi kuvaa vuorollaan, Havainnekuva luettava. Viat kerrottu, ei leikattu: k01a–d koko pallo tasaista beigeä ja musta pyörylä, k01e valkoinen alue ja suorakaide, k01f normaali; laskeutuessa kartta sumea (k04, k05). Kesto tuntematon: kuvakaappaus pysäyttää pelin (k01d:hen noin 40 ruutua). k01 on NS:n ja PT:n, ei minun.
- Nimirivi c8a71c1cd (natiivi-ui/kartta-nimirivi, NS 0c544d4ef:n päällä, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-nimirivi): rivi "Kadut, kaupunginosat ja pienet vedet", oletus pois, kuvat lokit/nui-kartta-nimirivi-2 (p1-p3) ja nui-kartta-nimirivi (r3, r6) KK:lla, sha PT:llä. Harmaa alle tason 14 tai jos kumpikin emoryhmä on pois. Testikomento `ui kartta rivi <id>`. Oikeaa kosketusta ja iPadia ei kokeiltu. Molemmat kokeena, ei junaan; poiminta vain PT:n sanalla.
- PT antoi pohjan vaihdon (gr-8-m kuvat 110–111, joki beigeksi) KS:lle; ei minun.

## 3. Avoinna, ei minun korjattavani ilman PT:n sanaa
- Tyhjän pohjan ja vinon reunan syy ajossa 356eb0101 mittaamatta; ei toistunut muissa ajoissa. Jumin 9,16 s:n syy tuntematon. Kylmä kartan levyvälimuisti ja oikea laite mittaamatta.
- Jos intron korjaus viedään junaan: `ui kuvajumi` ja mittausrivit pois. Kyltin kyltti-ui-lokirivi (ae497b124) on mittaus, pois junasta.
- Invalidit: `ui kohdenostot kyltti Invalidit` vastasi "ei merkkiä (oikeasti poissa)", piste saamatta; PT:lle kerrottu.
- NS:n Liiku 43a2fa300 erillään. Tappien lasku vaakapuhelimelle: vasta, kun UI-sarja on yhdistetty. E (yli 10 s:n vika) seurannassa, ei mitattu.
- Havainnot, ei korjattu: piilossa olevan elementin suodin jää voimaan; Livian ohjeteksti terävä sumean kartan päällä; kyltit portaittain iPadilla (PT: ei nyt); suurennuslasin haalea neliö; Lopeta kierros ja Linssit lähes samassa; Saapumiskortti, Latauspalkki, KaupunkiKortti, Ponnahdus tarkistamatta; aaripisteet 38 × kärkimäärä; Metroasema haalea sc-80:ssä; Tuileries'n kuva Louvren kulmassa.

## Opit
- `ui lentopiilo` piilottaa koko UI:n: paneelikuvissa se pois. Tarkista heti, ettei kaksi kuvaa ole tavulleen samoja (md5).
- Skenaarion `oleta` hakee koko lokista ja voi mennä läpi vanhasta rivistä; yksilöimätön tila tarkistetaan `ui kerros tila` -riviltä.
- Galerien "esiin" reunalla: levossa paluuvaraa ei ole, joten kyltti palaa levon alkaessa (ajo 34, gr-8-m 110).
- unity-tarkistus.sh sh:lla; varoituksia etsi "varoitusta", ei "warning". Testit: sh Kartta-testit/kaanna.sh. zsh: "${S}:polku".
- Poiminnan yhteensopivuus KS:n haaraan: git merge-tree --write-tree --merge-base=<c>^ <haara> <c>.

## Muuta
Etäyhteys vain KK:lla (ja PT:lla): älä kytke. Hookin työlistarivit (Nimet häipyvät, Vaaleat kyltit, Palatsin sisätilat) eivät tunnistu omikseni, en päivittänyt. Jos jono tyhjenee ajon 37 jälkeen: rivi PT:lle "JONO TYHJÄ: Natiivi-UI".
