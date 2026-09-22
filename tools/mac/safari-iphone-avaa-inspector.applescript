on run argv
  set appName to "Safari Technology Preview"
  set target to "matkakirja.app"
  tell application appName to activate
  delay 2
  tell application "System Events"
    tell process appName
      set mb to menu bar 1
      set devMenu to missing value
      repeat with m in (every menu bar item of mb)
        try
          set n to name of m
          if n is "Develop" or n is "Kehitys" then set devMenu to m
        end try
      end repeat
      click devMenu
      delay 0.7
      repeat with mi in (every menu item of menu 1 of devMenu)
        try
          if (name of mi) contains "iPhone" then
            click mi
            delay 6
            repeat with sub in (every menu item of menu 1 of mi)
              try
                if (name of sub) contains target then
                  click sub
                  delay 8
                  return "avattu: " & (name of sub) & " | ikkunat: " & ((name of every window) as text)
                end if
              end try
            end repeat
          end if
        end try
      end repeat
      key code 53
      key code 53
      return "ei löytynyt " & target
    end tell
  end tell
end run
