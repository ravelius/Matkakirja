# Codex → PT: #794 rauennut, #795–797 toimeenpantu; Matkakirjan kuvat jatkossa vain grafiikka

Luin kokonaan #796:n peruutuksen ja #797:n työnjaon. #794:n vanha 08.02 lupa on rauennut. Tämä sessio tekee jatkossa vain kuvat, tekstuurit ja havainne-/pohjakuvat; EI 3D-malleja eikä Tripo-generointeja. Tulevat3Dtyöt kuuluvat Tripo3D-sessiolle. Työnjako on tallennettu `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/matkakirjan-kuvat-scope-20261021.json` ja molempiin yhteisiin työtiloihin. Aiempi omistajuuden säilytysohje ei ohjaa tulevia3Dtöitä.

## #794:n todellinen lopputila

- Käytetty **12/12** Tripo-generointia, yksi per P01–P06:n ehjä/rikkoutunut tila. Kaikki12 palautuivat ja alkuperäiset12GLB:t on tallennettu muuttamattomina sekä SHA256-varmennettu. Odottavia0.
- Viimeinen generointipainallus 08.24.38; tämän session taukolähteen vastaanotto/luku 08.26.39; peruutuslähteen vastaanotto/luku 08.31.43 (Suomen aika). Tauon vastaanoton jälkeen0 uusia kutsuja; peruutuksen ja työnjakomuutoksen jälkeen0. Tämä ei väitä, että viimeinen painallus olisi ollut ennen lähteen otsikon08.21 omistajapäätöstä. Vastaanottoviiveen aikaleimat säilyvät lokissa.
- H3.1, tavoite16000 kolmiota, 2K PBR mukana samassa otossa: 12×45=540kredittiä, havaittu22050→21510. Ei uusia Texture/Retopo/Segmentation/FreeRetry-kutsuja, API-ostoja tai lisäkrediittejä.
- 12 erillistä omaa imagegen-pohjakuvaa tehtiin ennen taukoa. #792:n aiempaa yhteiskuvaa tai listaa ei tehty uudelleen.
- GLB:t ovat natiivit; suunniteltua skaala/pivot/sirpaleryhmämuunnosta EI ajettu. Ei käsin muotoiltua geometriaa, Blenderiä tai peliputken toimitusta. Tekninen muunnosskripti on estetty tauko/peruutuslipulla.
- Muotoportti0 / KAIKKI OK. Tämä ei ole esteettinen/toiminnallinen hyväksyntä. Ensimmäisen sinivalkoisen maljakon kuvio jäi liian vaaleaksi; muutosten uusintaa ei tehty. Sirpalemallien geometrisessa tarkistuksessa7–9 erillistä pintaryhmää, mutta erillisiä rigidbodyjä/fysiikkaa ei toteutettu/testattu. Mittasovitus ja täysi visuaalinen/360QA ovat avoimia ja erä peruttu.

Arkisto säilyy T7:llä: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-posliini-794-20261021/posliinit-794-peruttu-20261021.zip` (SHA256`fcb02f7e2c407092d058645ad18e8322518d2e64fa4e047bc8d6789cae2ffe38`, 47527884tavua). Jokainen51ZIP-jäsen on verrattu alkuperäiseen tavutasolla. Tämän postin liitteet ovat lopputilaraportti, kutsuloki, tarkistusdata ja arkiston tarkisteet; paikallista peruttua mallipakettia ei tällä kuittauksella toimiteta pelikäyttöön.

## Korvaavat kahdeksan esinettä

Tripo3D-chatin kuva+lista on jo toimitettu commitissa8071bbe3eb6891d41a12452586ac8aec959e586d. Luin postin ja manifestin:8esine-/sermiryhmää; varmennin3PNG:n olemassaolon/tavut kyseisestä commitista. En tehnyt niistä rinnakkaista tuotantoa tai uutta toimitusta. Mallinnus on tämän uuden työnjaon mukaan Tripo3D-chatin työ.

## #791 säilyy erillisenä

Neljä alkuperäistä osamallia toimitettu vastaanottotarkistukseen commitissadb05f0d293584c32812ed876706cb65b2a5fbc2f. Harmaat teksturoimattomat natiivit, ovien liike ja mitta-/lattialiitosten sovitus avoinna; ei väitetty neljää toimintavalmista peliosaa. Mallit ja historia säilyvät. Uusia3Dkutsuja tai viimeistelyä ei tehdä tässä sessiossa työnjaon#797 jälkeen.

| Tila | Tripon työnumero | Tavua | Natiivin SHA256 |
|---|---|---:|---|
| p01-intact | f3051bb1-b077-4784-9d74-8944c916f074 | 2262020 | `d199c8bc771a49cbcd2c748bf6b12749ddab8317353b3af94a115afe6cbc6dc5` |
| p01-broken | 1dd890f9-243e-4aca-aa51-4756c63b4860 | 2892476 | `fca596f4660b587b496551201e5adef9efeb7b2ae633f3f26a95e338b0386f75` |
| p02-intact | 80afe648-0aa2-4447-b08a-bac0218266e6 | 2339760 | `1ba24d59942ba86e7854cd6fc3e2b101afa1b8a9f7bacbb014dd4ae4eb2c67a6` |
| p02-broken | 2dff74b6-06db-49ab-b24c-7100336fa783 | 2374708 | `05bf0312fee1e724ee567d9c449c053255fabea265cfbcb6ad7333d31d0085ed` |
| p03-intact | 612eaf46-52e3-45a5-85d7-db9a126a826d | 2234236 | `b819378e45b48ecee2437f558d345ba0aa6020879d1ad856de96c69246bf162b` |
| p03-broken | 1976ecec-51c8-44ff-8b9e-a1b465eeb607 | 2395472 | `9490bfd4fef1c9118c3265697813ba03e18cc3ae373a1f51fb44b41da5f33f31` |
| p04-intact | 8f303b57-968c-4ff6-9e1d-f17559119ac1 | 2723056 | `f25cad15288508e4a59812e3b953c17f77584a4e4f78ac3d041aad5b551b5b24` |
| p04-broken | d5cff0f1-a3ee-47a8-9136-fc13d7c47f79 | 2193844 | `325dd97cf2673d3b4a6e7e5e159f21624b82c85b13559a123d86d05ccac73694` |
| p05-intact | d98dd392-263b-412f-a528-0c3d1343bf13 | 2370000 | `193cc372aaa27681e63e873bd1bdad3de4ab700aeea7755754ee0584ab41a35c` |
| p05-broken | 7faabb99-110c-4b12-b447-9d5ba83b4a32 | 2912540 | `ff5f9092f062c44a1495aa2e04c451706e6823a4a325e59dd89ff130ff7214b5` |
| p06-intact | e1c9ecfb-4bf1-4e14-8acd-df0bbc3d8c29 | 1830532 | `9d8aa6160f6dc361283b98f773dd513f23b7588c518be2818531e87eac87a2be` |
| p06-broken | bf8f25f4-adbf-4c94-b3c6-7b68229670cf | 2099880 | `9d8ef7c7d419ea3a41f6c7c1878bfcf49d7b4676d3d82a8c43451abd00d095fe` |

Ei Unity/R2/main/merge/julkaisutoimia eikä muiden automaatioiden herättämistä. Oma Tripo-WebGL-välilehti suljettu; käyttäjän muita välilehtiä ei suljettu.
