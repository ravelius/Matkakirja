// PULUN ÄÄNIKESKUSTELUN PUHDAS LOGIIKKA (Pelikoodari 28.9.2026; testit Peli-testit/Testit/PuluRealtimeTestit.cs).
//
// Web: js/pulu-realtime.js (kasittele, pcmFloat, base64Pcm, realtimeProtokollat), js/pollo.js
// (REALTIME_NAPPI_TEKSTIT) ja tools/pollo/realtime-koe.mjs (toimiva Node-asiakas: token → WebSocket
// aliprotokollalla `xai-client-secret.<token>` → session.update → input_audio_buffer.append).
// Workerin reitti {tehtava:'realtime'} (tools/pollo/worker.js hoidaRealtime) palauttaa
// {token, vanhenee, osoite, enintaanS, kaytetty, raja, istunto}; `istunto` kulkee session.update-viestiin
// RAAKANA JSONina sellaisenaan (sama Pulun kehote, ääni ja server VAD kuin webissä).
//
// Unity-kerros: Scripts/Peli/PuluRealtime.cs (UnityWebRequest, ClientWebSocket, natiivikanava) ja
// UI/Pulu/PuluRealtimeNappi.cs (koenappi chatissa).
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace Matkakirja.Peli
{
    /// <summary>Koenapin tila (web onTila: 'yhdistaa' | 'kuuntelee' | 'puhuu', 'loppu' = Valmis).</summary>
    public enum RealtimeTila
    {
        Valmis,
        Yhdistaa,
        Kuuntelee,
        Puhuu,
    }

    /// <summary>Palvelimen tapahtuman toimenpide (web PuluRealtime.kasittele).</summary>
    public enum RealtimeLaji
    {
        /// <summary>Tuntematon tai merkityksetön tapahtuma (myös rikkinäinen viesti).</summary>
        Ohita,
        /// <summary>input_audio_buffer.speech_started: pelaaja puhuu Pulun päälle → soiva vastaus pois, tila kuuntelee.</summary>
        PuheAlkoi,
        /// <summary>input_audio_buffer.committed: pelaajan vuoro päättyi (kupla paikalleen heti).</summary>
        VuoroPaattyi,
        /// <summary>conversation.item.input_audio_transcription.completed: pelaajan kuultu kysymys (Teksti).</summary>
        Kayttaja,
        /// <summary>response.output_audio.delta / response.audio.delta: vastausääni (Teksti = base64 PCM16 24 kHz).</summary>
        Aani,
        /// <summary>response.output_audio_transcript.delta: Pulun transkriptin lisäpala (Teksti).</summary>
        PuluPala,
        /// <summary>response.done: Pulun vuoro valmis.</summary>
        PuluValmis,
        /// <summary>error: pelaajalle näytettävä virherivi (Teksti).</summary>
        Virhe,
        /// <summary>session.updated: istunto otettu käyttöön (lokiin; web ei käsittele).</summary>
        IstuntoPaivitetty,
    }

    public readonly struct RealtimeTapahtuma
    {
        public readonly RealtimeLaji Laji;
        public readonly string Teksti;

        public RealtimeTapahtuma(RealtimeLaji laji, string teksti = null)
        {
            Laji = laji;
            Teksti = teksti;
        }
    }

    /// <summary>Workerin token-vastaus jäsennettynä. Ok = token ja osoite ovat; muuten Viesti pelaajalle.</summary>
    public sealed class RealtimeToken
    {
        public string Token, Osoite, Istunto, Viesti, Virhe;
        public int EnintaanS;
        public bool Ok => !string.IsNullOrEmpty(Token) && !string.IsNullOrEmpty(Osoite);
    }

    public static class PuluRealtimeLogiikka
    {
        /// <summary>Syöte- ja vastausäänen taajuus (worker realtimeIstunto: input/output audio/pcm 24000).</summary>
        public const int Taajuus = 24000;
        /// <summary>Mikrofonipalan pituus ennen lähetystä (web LAHETYSPALA_MS, realtime-koe.mjs PALA_MS).</summary>
        public const int LahetysMs = 40;
        /// <summary>Pienin lähetettävä pala tavuina (PCM16 mono).</summary>
        public const int LahetysTavut = Taajuus * LahetysMs / 1000 * 2;
        /// <summary>Istunnon enimmäispituus, jos worker ei kerro (web: Number(data.enintaanS) || 180, vähintään 30).</summary>
        public const int EnintaanOletusS = 180, EnintaanVahintaanS = 30;
        /// <summary>Virheviestin katto (web: error.message.slice(0, 160)).</summary>
        public const int VirheKatto = 160;

        public const string EiAuennut = "Pulu ei saanut äänilinjaa auki.";
        public const string EiAuennutLinja = "Äänilinja ei auennut (token tai verkko).";
        public const string Katkesi = "Äänilinja katkesi.";
        public const string AikaTaynna = "Kokeilun enimmäispituus täyttyi. Aloita uusi keskustelu napista.";
        public const string EiKaynnistynyt = "Äänikeskustelu ei käynnistynyt.";

        /// <summary>Koenapin teksti kussakin tilassa (web REALTIME_NAPPI_TEKSTIT).</summary>
        public static string NappiTeksti(RealtimeTila tila)
        {
            switch (tila)
            {
                case RealtimeTila.Yhdistaa: return "Yhdistän Puluun…";
                case RealtimeTila.Kuuntelee: return "Kuuntelen — lopeta";
                case RealtimeTila.Puhuu: return "Pulu puhuu — lopeta";
                default: return "Live"; // omistaja 2.10.2026: "Puhu Pululle (koe)" → "Live"
            }
        }

        /// <summary>
        /// Palvelimen tapahtuma → toimenpide (web kasittele, docs.x.ai Speech to Speech Server Messages).
        /// Rikkinäinen viesti ei kaada keskustelua: Ohita.
        /// </summary>
        public static RealtimeTapahtuma Jasenna(string json)
        {
            Dictionary<string, object> t;
            try { t = MiniJson.ObjektiTaiNull(MiniJson.Jasenna(json ?? "")); }
            catch (FormatException) { return new RealtimeTapahtuma(RealtimeLaji.Ohita); }
            if (t == null) return new RealtimeTapahtuma(RealtimeLaji.Ohita);
            switch (MiniJson.Teksti(t, "type"))
            {
                case "input_audio_buffer.speech_started":
                    return new RealtimeTapahtuma(RealtimeLaji.PuheAlkoi);
                case "input_audio_buffer.committed":
                    return new RealtimeTapahtuma(RealtimeLaji.VuoroPaattyi);
                case "conversation.item.input_audio_transcription.completed":
                    return new RealtimeTapahtuma(RealtimeLaji.Kayttaja, (MiniJson.Kentta(t, "transcript")?.ToString() ?? "").Trim());
                case "response.output_audio.delta":
                case "response.audio.delta":
                    return new RealtimeTapahtuma(RealtimeLaji.Aani, MiniJson.Teksti(t, "delta"));
                case "response.output_audio_transcript.delta":
                {
                    var pala = MiniJson.Teksti(t, "delta");
                    return string.IsNullOrEmpty(pala) ? new RealtimeTapahtuma(RealtimeLaji.Ohita) : new RealtimeTapahtuma(RealtimeLaji.PuluPala, pala);
                }
                case "response.done":
                    return new RealtimeTapahtuma(RealtimeLaji.PuluValmis);
                case "session.updated":
                    return new RealtimeTapahtuma(RealtimeLaji.IstuntoPaivitetty);
                case "error":
                {
                    var virhe = MiniJson.ObjektiTaiNull(MiniJson.Kentta(t, "error"));
                    return new RealtimeTapahtuma(RealtimeLaji.Virhe, VirheViesti(virhe != null ? MiniJson.Kentta(virhe, "message")?.ToString() : null));
                }
                default:
                    return new RealtimeTapahtuma(RealtimeLaji.Ohita);
            }
        }

        /// <summary>Web: `Pulun äänilinja: ${String(t.error?.message ?? 'virhe').slice(0, 160)}`.</summary>
        public static string VirheViesti(string viesti)
        {
            var s = viesti ?? "virhe";
            if (s.Length > VirheKatto) s = s.Substring(0, VirheKatto);
            return "Pulun äänilinja: " + s;
        }

        /// <summary>
        /// Tilakone: seuraava napin tila tapahtumasta, null = ei muutosta. Ääni → puhuu; pelaajan puhe → kuuntelee
        /// (web kasittele). Puhuu → kuuntelee soiton loputtua on SoittoLoppui.
        /// </summary>
        public static RealtimeTila? SeuraavaTila(RealtimeTila nyt, RealtimeLaji laji)
        {
            if (nyt == RealtimeTila.Valmis || nyt == RealtimeTila.Yhdistaa) return null;
            if (laji == RealtimeLaji.Aani && nyt != RealtimeTila.Puhuu) return RealtimeTila.Puhuu;
            if (laji == RealtimeLaji.PuheAlkoi && nyt != RealtimeTila.Kuuntelee) return RealtimeTila.Kuuntelee;
            return null;
        }

        /// <summary>Web soita → onended: kun jonossa ei ole enää soitettavaa, tila palaa kuunteluun.</summary>
        public static bool SoittoLoppui(RealtimeTila nyt, int jonossaNaytteita) =>
            nyt == RealtimeTila.Puhuu && jonossaNaytteita <= 0;

        /// <summary>Token-pyynnön runko (web aloita: {tehtava:'realtime', konteksti, aani, taajuus}).</summary>
        public static string TokenRunko(string konteksti, string aani, int taajuus = Taajuus)
        {
            var sb = new StringBuilder("{\"tehtava\":\"realtime\",\"konteksti\":");
            sb.Append(Passi.JsonTeksti(konteksti ?? ""));
            if (!string.IsNullOrEmpty(aani)) sb.Append(",\"aani\":").Append(Passi.JsonTeksti(aani));
            sb.Append(",\"taajuus\":").Append(taajuus.ToString(CultureInfo.InvariantCulture)).Append('}');
            return sb.ToString();
        }

        /// <summary>
        /// Workerin vastaus (tila, runko) → token. Virheessä Viesti = workerin oma viesti (403 koodi, 429 päiväkatto,
        /// 502 xAI) tai web-oletus "Pulu ei saanut äänilinjaa auki.".
        /// </summary>
        public static RealtimeToken LueToken(long tila, string runko)
        {
            var tulos = new RealtimeToken { EnintaanS = EnintaanS(null) };
            Dictionary<string, object> o = null;
            try { o = MiniJson.ObjektiTaiNull(MiniJson.Jasenna(runko ?? "")); }
            catch (FormatException) { }
            if (o != null)
            {
                tulos.Virhe = MiniJson.Teksti(o, "virhe");
                tulos.Viesti = MiniJson.Teksti(o, "viesti");
                if (tila >= 200 && tila < 300)
                {
                    tulos.Token = MiniJson.Teksti(o, "token");
                    tulos.Osoite = MiniJson.Teksti(o, "osoite");
                    tulos.EnintaanS = EnintaanS(MiniJson.Luku(o, "enintaanS"));
                    tulos.Istunto = RaakaKentta(runko, "istunto");
                }
            }
            if (!tulos.Ok)
            {
                tulos.Token = null;
                if (string.IsNullOrWhiteSpace(tulos.Viesti)) tulos.Viesti = EiAuennut;
                if (tulos.Virhe == null) tulos.Virhe = tila >= 200 && tila < 300 ? "token" : "tila " + tila;
            }
            return tulos;
        }

        /// <summary>Istunnon enimmäispituus sekunteina (web Math.max(30, Number(data.enintaanS) || 180)).</summary>
        public static int EnintaanS(double? arvo)
        {
            double s = arvo.HasValue && !double.IsNaN(arvo.Value) && arvo.Value != 0 ? arvo.Value : EnintaanOletusS;
            if (double.IsInfinity(s) || s > int.MaxValue / 2) s = int.MaxValue / 2;
            return (int)Math.Max(EnintaanVahintaanS, Math.Floor(s));
        }

        /// <summary>Onko enimmäispituus täynnä (sekunteina alusta).</summary>
        public static bool AikaLoppui(double alkuS, double nytS, int enintaanS) => nytS - alkuS >= enintaanS;

        /// <summary>WebSocketin aliprotokolla tokenille (web realtimeProtokollat, realtime-koe.mjs).</summary>
        public static string Aliprotokolla(string token) => "xai-client-secret." + token;

        /// <summary>session.update raa'alla istunto-JSONilla (realtime-koe.mjs: { type, session: istunto }).</summary>
        public static string IstuntoPaivitys(string istuntoJson) =>
            "{\"type\":\"session.update\",\"session\":" + (string.IsNullOrWhiteSpace(istuntoJson) ? "{}" : istuntoJson.Trim()) + "}";

        /// <summary>input_audio_buffer.append (PCM16 LE mono base64).</summary>
        public static string AppendViesti(byte[] pcm, int alku, int pituus) =>
            "{\"type\":\"input_audio_buffer.append\",\"audio\":\"" + Convert.ToBase64String(pcm, alku, pituus) + "\"}";

        /// <summary>base64 PCM16 LE → float (web pcmFloat: v / 0x8000). Pariton loppu­tavu ohitetaan; rikkinäinen → tyhjä.</summary>
        public static float[] PcmFloat(string base64)
        {
            if (string.IsNullOrEmpty(base64)) return Array.Empty<float>();
            byte[] tavut;
            try { tavut = Convert.FromBase64String(base64); }
            catch (FormatException) { return Array.Empty<float>(); }
            int n = tavut.Length >> 1;
            var ulos = new float[n];
            for (int i = 0; i < n; i++)
            {
                short v = (short)(tavut[i * 2] | (tavut[i * 2 + 1] << 8));
                ulos[i] = v / 32768f;
            }
            return ulos;
        }

        /// <summary>
        /// Ylimmän tason kentän arvo RAAKANA JSONina (objekti, taulukko, merkkijono lainausmerkkeineen, luku, true/false/null)
        /// sellaisenaan, jotta workerin istunto kulkee xAI:lle muuttumattomana. null, jos kenttää ei ole tai JSON on rikki.
        /// </summary>
        public static string RaakaKentta(string json, string nimi)
        {
            if (string.IsNullOrEmpty(json) || nimi == null) return null;
            int i = OhitaValit(json, 0);
            if (i >= json.Length || json[i] != '{') return null;
            i++;
            while (true)
            {
                i = OhitaValit(json, i);
                if (i >= json.Length) return null;
                if (json[i] == '}') return null;
                if (json[i] == ',') { i++; continue; }
                if (json[i] != '"') return null;
                int avainLoppu = MerkkijononLoppu(json, i);
                if (avainLoppu < 0) return null;
                string avain;
                try { avain = MiniJson.Jasenna(json.Substring(i, avainLoppu - i)) as string; }
                catch (FormatException) { return null; }
                i = OhitaValit(json, avainLoppu);
                if (i >= json.Length || json[i] != ':') return null;
                i = OhitaValit(json, i + 1);
                int arvoLoppu = ArvonLoppu(json, i);
                if (arvoLoppu < 0) return null;
                if (avain == nimi) return json.Substring(i, arvoLoppu - i);
                i = arvoLoppu;
            }
        }

        static int OhitaValit(string s, int i)
        {
            while (i < s.Length && (s[i] == ' ' || s[i] == '\t' || s[i] == '\n' || s[i] == '\r')) i++;
            return i;
        }

        /// <summary>Merkkijonon (alkaa lainausmerkillä kohdassa i) loppu: indeksi päättävän lainausmerkin jälkeen.</summary>
        static int MerkkijononLoppu(string s, int i)
        {
            for (int j = i + 1; j < s.Length; j++)
            {
                if (s[j] == '\\') { j++; continue; }
                if (s[j] == '"') return j + 1;
            }
            return -1;
        }

        /// <summary>Arvon loppu kohdasta i: sisäkkäiset {} ja [] lasketaan, merkkijonojen sisältö ohitetaan.</summary>
        static int ArvonLoppu(string s, int i)
        {
            if (i >= s.Length) return -1;
            char c = s[i];
            if (c == '"') return MerkkijononLoppu(s, i);
            if (c == '{' || c == '[')
            {
                int syvyys = 0;
                for (int j = i; j < s.Length; j++)
                {
                    char d = s[j];
                    if (d == '"')
                    {
                        j = MerkkijononLoppu(s, j);
                        if (j < 0) return -1;
                        j--;
                        continue;
                    }
                    if (d == '{' || d == '[') syvyys++;
                    else if (d == '}' || d == ']')
                    {
                        syvyys--;
                        if (syvyys == 0) return j + 1;
                    }
                }
                return -1;
            }
            int k = i;
            while (k < s.Length && s[k] != ',' && s[k] != '}' && s[k] != ']' && s[k] != ' ' && s[k] != '\n' && s[k] != '\r' && s[k] != '\t') k++;
            return k > i ? k : -1;
        }
    }

    /// <summary>
    /// Säieturvallinen float-jono Unity-toistolle (AudioClip stream + PCMReaderCallback): WebSocket-säie kirjoittaa,
    /// äänisäie lukee. Täyttyessä vanhin pois; tyhjänä luku täyttää hiljaisuudella.
    /// </summary>
    public sealed class AaniJono
    {
        readonly object lukko = new object();
        readonly float[] data;
        int alku, maara;

        public AaniJono(int kapasiteetti) { data = new float[Math.Max(1, kapasiteetti)]; }

        public int Kapasiteetti => data.Length;

        /// <summary>Soittamatta olevat näytteet.</summary>
        public int Maara { get { lock (lukko) return maara; } }

        public void Kirjoita(float[] naytteet, int pituus)
        {
            if (naytteet == null || pituus <= 0) return;
            pituus = Math.Min(pituus, naytteet.Length);
            lock (lukko)
            {
                int koko = data.Length, o = 0;
                if (pituus > koko) { o = pituus - koko; pituus = koko; }
                int yli = maara + pituus - koko;
                if (yli > 0) { alku = (alku + yli) % koko; maara -= yli; }
                int kirj = (alku + maara) % koko;
                int eka = Math.Min(pituus, koko - kirj);
                Array.Copy(naytteet, o, data, kirj, eka);
                if (pituus > eka) Array.Copy(naytteet, o + eka, data, 0, pituus - eka);
                maara += pituus;
            }
        }

        /// <summary>Täyttää kohteen: jonon näytteet ja loput hiljaisuutta. Palauttaa jonosta luettujen määrän.</summary>
        public int Lue(float[] kohde)
        {
            if (kohde == null) return 0;
            lock (lukko)
            {
                int n = Math.Min(kohde.Length, maara), koko = data.Length;
                int eka = Math.Min(n, koko - alku);
                Array.Copy(data, alku, kohde, 0, eka);
                if (n > eka) Array.Copy(data, 0, kohde, eka, n - eka);
                if (n < kohde.Length) Array.Clear(kohde, n, kohde.Length - n);
                alku = (alku + n) % koko;
                maara -= n;
                return n;
            }
        }

        public void Tyhjenna() { lock (lukko) alku = maara = 0; }
    }
}
