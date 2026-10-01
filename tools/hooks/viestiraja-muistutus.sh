#!/bin/bash
# VIESTIRAJAN MUISTUTUS — PostToolUse/PostToolUseFailure-hook SendMessage-työkalulle.
# Omistaja 30.9.2026 klo 22.2x: "Sessiot eivät osaa enää kiertää viestirajaa" + kortti:
# lisää hook, kirjaa Raamattuun, toimii tilinvaihdon jälkeen automaattisesti.
# Kun SendMessage epäonnistuu (success:false, "Failed to send", ENOENT, raja), tämä
# lisää sessiolle ohjeen käyttää varakanavaa heti. Onnistuneisiin ei reagoida.
# Asennus: projektin .claude/settings.json (versioitu) + tools/hooks/asenna-viestiraja-hook.sh
# (käyttäjätaso, välitön vaikutus). Kaksoisajo estetään mkdir-lukolla tool_use_id:n mukaan.
syote=$(cat)
tapahtuma=$(printf '%s' "$syote" | jq -r '.hook_event_name // "PostToolUse"' 2>/dev/null) || exit 0
epaonnistui=$(printf '%s' "$syote" | jq -r '
  def teksti_epaonnistui: test("Failed to send|ENOENT|rate.?limit|limit reached|too many (peer )?messages"; "i");
  def epaonnistui(r):
    if (r|type) == "object" then
      (if r.success == false then true
       elif (r|has("text")) then (r.text|tostring) as $t | (($t|fromjson? // null) as $j
         | if ($j|type) == "object" then ($j.success == false) else ($t|teksti_epaonnistui) end)
       else false end)
    elif (r|type) == "string" then ((r|fromjson? // null) as $j
      | if ($j|type) == "object" then ($j.success == false) else (r|teksti_epaonnistui) end)
    elif (r|type) == "array" then any(r[]; epaonnistui(.))
    else false end;
  if .hook_event_name == "PostToolUseFailure" then true else epaonnistui(.tool_response) end' 2>/dev/null)
[ "$epaonnistui" = "true" ] || exit 0
tunnus=$(printf '%s' "$syote" | jq -r '.tool_use_id // empty' 2>/dev/null)
[ -n "$tunnus" ] || tunnus="$(printf '%s' "$syote" | jq -r '.session_id // "x"' 2>/dev/null)-$(date +%s)"
mkdir "/tmp/viestiraja-muistutus-$tunnus" 2>/dev/null || exit 0
ohje='VIESTIRAJA (Raamattu, omistaja 30.9.2026): SendMessage epäonnistui. Älä lykkää viestiä seuraavaan kierrokseen äläkä pyydä omistajaa tai Postivahtia välittämään. Käytä heti varakanavaa: 1) ToolSearch "select:mcp__ccd_session_mgmt__send_message,mcp__ccd_session_mgmt__list_sessions" 2) mcp__ccd_session_mgmt__list_sessions → vastaanottajan sessionId (local_…) 3) mcp__ccd_session_mgmt__send_message(session_id, message) — se ei kuluta SendMessage-rajaa. "Failed to send … ENOENT" = vastaanottaja nollattiin ja socket vaihtui; session id on ennallaan. Jos varakanavakin estyy: kirjoita docs/raportit/posti-<rooli>-<pvm>.md ja pushaa.'
jq -n --arg tapahtuma "$tapahtuma" --arg ohje "$ohje" \
  '{hookSpecificOutput: {hookEventName: $tapahtuma, additionalContext: $ohje}}'
