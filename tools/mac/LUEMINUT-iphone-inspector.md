# iPhonen Web Inspector Macilta (22.9.2026)

Toimii Safari Technology Preview'lla kun iPhone on USB:ssä, lukitus auki
ja matkakirja.app Safarissa etualalla. Safari 26.6 ei näe iOS 27 -laitetta.

1. `osascript tools/mac/safari-kehitys-iphone.applescript "Safari Technology Preview"`
   listaa Develop → Samin iPhone -alivalikon sivut (Connecting… = puhelin lukossa).
2. `osascript tools/mac/safari-iphone-avaa-inspector.applescript` avaa Web
   Inspectorin matkakirja.app-sivulle.
3. Klikkaukset Web Inspectoriin: System Events "click at" ei toimi; käännä
   `swiftc -O tools/mac/klikkaa.swift -o /tmp/klikkaa` ja klikkaa
   `/tmp/klikkaa X Y` (näytön pikselit, 2560×1440; screencapture -x kuva.png).
   Timelines-välilehti (1318,245), nauhoitus (794,272), Export (1722,272),
   "Stop recording once page loads" (1426,272), Enabled Timelines -kynä (963,298).
4. Kytke Screenshots-aikajana pois ennen nauhoitusta: kuvakaappaukset
   kuormittavat puhelinta niin, että nykiminen on tavallista pahempi.
5. Avoin: Export-nappi jää harmaaksi eikä tallennusikkunaa tule (Laitetestaaja selvittää).
