# Natiivi-UI: luovutus 18.10.2026 klo 09.30 (Postivahti: kova raja 37 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Korvaa -0640:n (sen "Opit" ja simunäppäinpaikat yhä voimassa). Id:t /Users/Shared/Claude/osoitekirja.md
(PT local_cf5b4eca-…, Julkaisija local_1325b8e8-…, NS local_04e2850b-…, Valoseppä local_ee961a2d-…). Simu VAIN Julkaisijan SIMU NYT -viestistä;
ajon jälkeen app pois (bundle app.matkakirja.proto3d, `xcrun simctl --set "/Volumes/T7 4TB/Simulaattorit/Sarja" boot/uninstall/shutdown <udid>`)
+ SIMU VAPAA. Udidit: iPhone 123B4B25-36B7-4A76-B677-905621CD8F5A, iPad F7513985-C8BC-4E97-8D29-9C9BD420E962. Ajoskriptit
/Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/, kuvarivit `python3 /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/kuva6-todiste/kolmikko.py ulos.png a b c …`.
PT 08.3x: EI rm:ää (lupakyselyt yöllä); siivous vain keinoilla, jotka eivät kysy lupaa.

## AVOIN (ENSIN)
1. **Aloituslogo** (omistaja 08.53 PT:n kautta: logo aiemmin sisään ja hieman aiemmin pois): natiivi-ui/aloituslogo-202 **aa7bf0c4e** → NS yhdisti
   juna 202 **97775f95b** (Rakennus.Aloituslogo tarkistettu). Logo Unityn käynnistysruutuun (SplashScreen.show, Unityn logo pois, musta, sprite
   Kartta/Aloitusruutu-logo-splash.png 1200×600 reunuksella, kesto 15 s); Aloitusverho: käynnistysruudun aikana ei omaa logoa, pallo valmis →
   SplashScreen.Stop(FadeOut) → musta 0,25 s → peli 0,5 s. Kuvakäännös vasta PT:n pyynnöstä. TODISTE RUUTUINA (ei videota, PT 09.2x):
   NYK = /Users/Shared/Claude/proto-3d/_tyo/julkaisija/juna202-kuva1-app, UUSI = uusi kuvakäännös (⊇ 97775f95b):
   `zsh ajo-kylmakaynnistys-202.zsh <app-kansio> <udid> iphone` → lokit/kylmakaynnistys-*/ruudut (0,5 s välein) → valitse ~1 s, ~3 s, logo pois,
   peli → NYK|UUSI → PT. TARKISTA: logon koko (Unity mitoittaa itse; jos väärä, säädä spriten reunusta), pysyykö logo koko latauksen
   (verkossa raportoitu tyhjä splash logon jälkeen) ja konsolista "MATKAKIRJA aloitusverho: käynnistysruutu pois".
2. **Louvren Pulu → Pulu-chat** (VS:n pyyntö, omistaja 09.04): natiivi-ui/museo-pulu-chat-202 **27f4c89df** (VS:n linssiseppa2/louvre-pilotti-202
   4e3148f73 päällä): MuseoTaulu.Pulu.cs tilaa MuseoPulu.Napautettu → Chat.AvaaLinssissa(napautuskohta, "museo:pulu", null, "lasi").
   VS:lle 09.2x, VS yhdistää ja todistaa. VS:n MuseoPulu.cs kaataa liikevahdin (3 > 0), kerrottu VS:lle.

## TEHTY TÄNÄ AAMUNA (PT HYVÄKSYNYT)
- Kuva-kokoruutu (musta tausta, kuvateksti piiloon zoomattuna, gallerian alateksti "Oma kuva · paikka · aika") kuva 6:sta.
- Kehyshäivytys kaikkiin reunanappeihin: **0583403e9** natiivi-ui/kehysnapit-opas-202 (Kipin väkänen + rivi KehysNapit.Merkki, tapit + kaasuvipu
  uusi KehysNapit.Ohjain: himmenee, käyttö ei tuo muita esiin) juna 202:ssa 511a53249; todistettu 202-1 samasta kulmasta (kuvat
  _tyo/natiivi-ui/kehyshaivytys-202/202b-*.png). Kipin kamera kiertää Eiffelin vaalean pinnan eteen (lähes valkoinen ruutu) → LS:n jonossa.
- Maakunta suoraan artikkeliin oli jo valmis (fef47c0aa juna 201).
- Siivous 08.4x: 4 vanhaa .app + 9 mergettyä proto-worktreetä (~6,5 Gt). Jäännös wt/proto-natiivi-ui-kohdevalikko-201 (.DS_Store, Finder pitää auki).

## Worktreet (proto)
wt/proto-natiivi-ui-kehysnapit-opas-202 (mergetty, poistettavissa), -aloituslogo-202 (mergetty 97775f95b), -museo-pulu-202 (avoin, VS),
vanhat yhdistämättömät: -cupola-ohita-197, -kamerapoyta-198, -museo-ikortti-198, -uni-v2, -yhteis-pariisi-200.

## Opit
- Oppaan (Kip) kamera kiertää kohdetta: pari otetaan pakotetuin tiloin ~2 s välein heti saapumisen jälkeen (`ui kehysnapit 0 | 1 + himmea | tap`),
  muuten kuvakulma vaihtuu (sk-kehyshaivytys-202b-*).
- Inline-opacity (esim. liukuva rivi) peittää USS-luokan: häivytysluokka lapsiin, ei riviin. Samantarkkuuksiset USS-säännöt: myöhempi voittaa.
- zsh: `git show "${B}:Assets/…"` (ilman aaltosulkeita `$B:A` on zsh:n polkumuunnin).
- Unity-splash peittää vain ensimmäisen kohtauksen latauksen; 62 AfterSceneLoad-koukkua estää kevyen käynnistyskohtauksen.
