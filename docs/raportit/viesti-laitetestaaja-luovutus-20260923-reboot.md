# Laitetestaaja: 3 rivin tila ennen rebootia (23.9.2026 klo ~12.35)

PR #2914 (pulu-laukaisijataulukko, korjattu Codexin päätöksen mukaan)
avoinna, Julkaisijalle ilmoitettu. WebKit-diagnoosikoe (LaunchAgent
SessionCreate-hypoteesi) KESKEYTETTY kesken — auto mode -classifier
esti `launchctl bootstrap`-kutsun ("Unauthorized Persistence") ennen
kuin mitään ehdittiin rekisteröidä (varmistettu: `launchctl list` ei
näytä jäänteitä). Kontrollihavainto ehdittiin: tavallisessa Aqua-
sessiossa (SECURITYSESSIONID=192f7) WebKit launchaa 160 ms:ssa, ei
toistoa paikallisesti — sama havainto kuin 22.9. raportissa.
Simulaattori ei ollut päällä. Reboot-jälkeinen ensimmäinen tehtävä:
aja yksi PR-savuke, totea launch-timeout poistuiko.
