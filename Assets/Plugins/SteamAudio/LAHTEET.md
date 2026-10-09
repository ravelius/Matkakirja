# Steam Audio 4.8.1 (Valve) — lähde, lisenssi ja muutokset

- Paketti: Steam Audio Unity -liitännäinen v4.8.1, Valve Corporation, virallinen GitHub-julkaisu
  https://github.com/ValveSoftware/steam-audio/releases/tag/v4.8.1 (julkaistu 11.2.2026), tiedosto
  `steamaudio_unity_4.8.1.zip` (138 708 392 t, sha256 9b7e3689561670e6b4b8e0c579a2d951bb4a0589f7d46c23bc9df923d62940f0),
  siitä `steamaudio_unity/unity/SteamAudio.unitypackage` (sha256 a080b5c967a031e3109c6c922e1c83d21b4ae0fe3e9fa72bce941e20f3e965e2).
  Ladattu 9.10.2026 (Linssiseppä, `gh release download v4.8.1 -R ValveSoftware/steam-audio`).
- Lisenssi: Apache License 2.0 (LICENSE.md, repon LICENSE.md tagista v4.8.1). Binäärien kolmannen osapuolen osat
  (Intel IPP, FFTS, PFFFT, MySOFA, Embree, RadeonRays, TrueAudio Next, CIPIC HRTF, Google SH) THIRDPARTY.md:ssä; niiden
  ilmoitukset on toistettava jakelussa (sovelluksen ☰ Lähteet -näkymä, ennen kuin koe kytketään oletuksena päälle).
- Tavaramerkki: "Steam Audio" on Valven tavaramerkki; nimeä saa käyttää vain alkuperän kuvaamiseen, ei kumppanuuden
  vihjaamiseen (TRADEMARK_RIGHTS.md, tag v4.8.1).
- Käyttö: pallon 3D-äänten HRTF-koe (kehittäjäkytkin `pallo.SteamAudio`, oletus pois; `opas steamaudio 0|1|tila`).
  Pelin puoli: Assets/Matkakirja/Linssit/Unity/SteamAudioKoe.cs ja tämän kansion Scripts/Runtime/MatkakirjaSteamAudio.cs.

## Mukana (pathname-tiedoston polun mukaan, guidit alkuperäisistä .meta-tiedostoista)

- Scripts/Runtime (C#, asmdef SteamAudioUnity), Scripts/Editor (C#, asmdef SteamAudioUnityEditor).
- Binaries/iOS: libphonon.a, libaudioplugin_phonon.a, libmysofa.a, libpffft.a (arm64, staattiset) ja
  SteamAudioUnityAppController.h/.mm (rekisteröi natiivin ääniliitännäisen iOS:llä). Alkuperäiset platform-asetukset: vain iOS.
- Binaries/macOS: phonon.bundle, audioplugin_phonon.bundle. Alkuperäiset platform-asetukset: editori + OSXUniversal.
- Resources/Materials (11 oletusmateriaalia, kukin ~600 t). HRTF-oletusdata on libphononin sisällä (gDefaultHrtfData),
  erillistä SOFA-tiedostoa ei tarvita.

## Pois jätetty (repo ei paisu)

- Binaries/Windows (x86, x86_64: phonon.dll, audioplugin_phonon.dll, TrueAudioNext.dll, GPUUtilities.dll), Binaries/Linux
  (x86, x86_64), Binaries/Android (arm64, armv7, x86), Binaries/HTML5; zipin doc/, symbols/ (pdb, dbg) sekä
  SteamAudioFMODStudio.unitypackage ja SteamAudioWwise.unitypackage. Paketissa ei ollut demo- tai esimerkkikansiota.

## Matkakirjan muutokset (Apache 2.0, kohta 4b)

1. SteamAudioManager.cs: `AutoInitialize` ei enää aja `[RuntimeInitializeOnLoadMethod]`ia (vain määritteellä
   MATKAKIRJA_STEAMAUDIO_AUTOINIT); alustus MatkakirjaSteamAudio.Kaynnista()-kutsusta, kun kytkin on päällä.
2. Scripts/Editor/Build.cs: `Defines` ei kirjoita STEAMAUDIO_ENABLED-määritettä PlayerSettingsiin editorin avautuessa
   (käännöskopiot pysyvät puhtaina); BuildProcessor (libz.tbd Xcode-projektiin) ennallaan.
3. SteamAudioUnity.asmdef ja SteamAudioUnityEditor.asmdef: `versionDefines` Unity ≥ 2021.2 → STEAMAUDIO_ENABLED vain
   Steam Audion omiin assemblyihin.
4. macOS-bundlet ohennettu arm64:ksi (`lipo -thin arm64`; Mac-käännös on ARM64, editori Apple Siliconilla); viipaleen oma
   ad hoc -allekirjoitus säilyy. Alkuperäinen universal (x86_64 + arm64) phonon oli 25,5 Mt, ohennettu 6,8 Mt.
5. Uudet tiedostot: Resources/SteamAudioSettings.asset (kevyet asetukset: heijastukset 0,1 s, kertaluku 0, 1 säie,
   päivitys 1 s; ilman tätä Valven koodi luo assetin editorissa itse), Scripts/Runtime/MatkakirjaSteamAudio.cs (silta),
   tämä tiedosto, LICENSE.md ja THIRDPARTY.md. ProjectSettings/AudioManager.asset: m_SpatializerPlugin = Steam Audio Spatializer.
