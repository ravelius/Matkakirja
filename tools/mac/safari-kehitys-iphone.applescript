-- Listaa Safarin (tai Safari Technology Preview'n) Kehitys/Develop-valikon
-- iPhone-alivalikon sivut GUI-skriptauksella. Vaatii Käytettävyys-luvan
-- (annettu 22.9.2026). Käyttö: osascript tools/mac/safari-kehitys-iphone.applescript "Safari Technology Preview"
-- Tila "Connecting…"/"Yhdistetään…" = puhelimen Web Inspector ei vastaa
-- (puhelin lukossa, Web Inspector pois, Developer Mode, tai luottamus).
on run argv
  set appName to "Safari"
  if (count of argv) > 0 then set appName to item 1 of argv
  tell application appName to activate
  delay 2
  tell application "System Events"
    tell process appName
      set mb to menu bar 1
      set devName to ""
      repeat with n in (name of every menu of mb)
        if (n as text) is "Develop" or (n as text) is "Kehitys" then set devName to (n as text)
      end repeat
      if devName is "" then return "Ei Kehitys-valikkoa: kytke Asetukset → Lisäasetukset → Näytä verkkokehittäjän ominaisuudet"
      set m to menu devName of mb
      click m
      delay 0.5
      set found to ""
      repeat with mi in (every menu item of m)
        try
          if (name of mi) contains "iPhone" then
            click mi
            delay 5
            set found to (name of mi) & ": " & (name of every menu item of (menu 1 of mi))
          end if
        end try
      end repeat
      key code 53
      key code 53
      return found
    end tell
  end tell
end run
