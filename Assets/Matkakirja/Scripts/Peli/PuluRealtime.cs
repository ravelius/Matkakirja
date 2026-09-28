// PULUN REAALIAIKAINEN ÄÄNIKESKUSTELU — KOE (Pelikoodari 28.9.2026; omistajan tilaus 28.9.: "pelaaja voisi jutella
// ääneen pululle ja se vastaisi reaaliajassa heti takaisin … tehdään tästä oma koenappi").
//
// Web: js/pulu-realtime.js (PuluRealtime) ja js/pollo.js vaihdaRealtime; yhteysprotokolla täsmälleen kuten
// tools/pollo/realtime-koe.mjs. Vain kehittäjätilassa pöllön kehittäjäkoodilla (UI/Pulu/PuluRealtimeNappi.cs);
// Sonnet-chat on edelleen pelin Pulu. Puhdas logiikka (tapahtumat, tilakone, token, base64/PCM, aikaraja) on
// Peli/PuluRealtimeLogiikka.cs:ssä ja testattu Peli-testeissä.
//
// KULKU
//   1. Mikrofonilupa (Plugins/iOS/MatkakirjaPuhekanava.mm; dialogi kuten sanelussa) ennen verkkoa.
//   2. Sanelu ja luenta pois (web lopetaSanelu, peruLuenta, pysaytaLukija).
//   3. Token workerilta: POST {tehtava:'realtime', konteksti, aani, taajuus} otsakkein x-matkakirja-natiivi,
//      User-Agent ja x-pollo-kehittaja (Asetukset.PolloKoodi) kuten Puhe.cs SynteesiPyynto. Worker vastaa
//      {token, osoite, enintaanS, istunto}; API-avain ei koskaan tule laitteelle.
//   4. ClientWebSocket osoitteeseen `osoite` aliprotokollalla `xai-client-secret.<token>` (realtime-koe.mjs,
//      selain); heti avauduttua session.update, jonka `session` on workerin istunto RAAKANA JSONina.
//   5. Mikrofoni vasta linjan auettua (web: worklet kytketään open-tapahtuman jälkeen): natiivi rengaspuskuri
//      (24 kHz PCM16 mono, kaiunpoisto) luetaan taustasäikeessä 40 ms välein → input_audio_buffer.append.
//   6. Vastaanotto (taustasäie): response.output_audio.delta → PCM16 → float × lukijan taso → Kompressori.Lukija
//      (sama puhepiiri kuin Puhe.cs:n PuheVahvistin, web puhePiirinKohde) → soitto. speech_started vaientaa
//      soivan vastauksen heti (web vaienna). Ääni EI kierrä pääsäikeen kautta: toisto ei saa riippua ruudun-
//      päivityksestä (lepotilassa Update harvenee). Muut tapahtumat (tila, tekstitykset, virheet, sulkeutuminen)
//      kulkevat jonon kautta pääsäikeeseen (Update).
//   7. Lopetus: nappi, chatin sulkeminen, OnApplicationPause(true), enintaanS, natiivin keskeytys (puhelu,
//      taustalle, vieras luokanvaihto), linjan sulkeutuminen, sanelun tai luennan alku.
//
// TOISTO: oletuksena natiivikanavan AVAudioPlayerNode samassa voice processing -moottorissa kuin mikrofoni, jotta
// kaiunpoisto tuntee Pulun äänen (Unityn AudioSource soi omassa RemoteIO:ssaan, jota kaiunpoisto ei näe: Pulu
// kuuluisi mikrofoniin ja keskeyttäisi itsensä). Vaihtoehto `pulu realtime toisto unity`: striimaava AudioClip
// (PCMReaderCallback, 24 kHz mono) ja oma AudioSource kuten Puhe.cs:n lähde (ei mixer-ryhmää).
using System;
using System.Collections;
using System.Collections.Concurrent;
using System.IO;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Networking;
#if UNITY_IOS && !UNITY_EDITOR
using System.Runtime.InteropServices;
#endif

namespace Matkakirja.Natiivi
{
    [DisallowMultipleComponent]
    public sealed class PuluRealtime : MonoBehaviour
    {
        public static PuluRealtime Instanssi { get; private set; }

        /// <summary>Toisto Unityn AudioSourcella natiivikanavan sijaan (kehittäjäkomento pulu realtime toisto unity|natiivi).</summary>
        public static bool UnityToisto { get; set; }

        public const string EiLupaa = "Mikrofonin käyttö ei ole sallittu. Voit sallia sen iOS:n Asetuksissa kohdassa Matkakirja.";
        public const string EiMikrofonia = "Mikrofonia ei saatu käyttöön. Yritä uudelleen.";
        public const string Keskeytyi = "Äänikeskustelu keskeytyi.";
        public const string VainLaitteella = "Äänikeskustelu toimii vain iOS-laitteella.";

        /// <summary>Tilan muutos (myös Valmis = web 'loppu').</summary>
        public event Action<RealtimeTila> TilaMuuttui;
        /// <summary>Pelaajan vuoro päättyi (web onKayttajaAlku: kupla paikalleen heti).</summary>
        public event Action KayttajaAlku;
        /// <summary>Pelaajan kuultu kysymys (web onKayttaja).</summary>
        public event Action<string> Kayttaja;
        /// <summary>Pulun transkriptin lisäpala (web onPulu).</summary>
        public event Action<string> PuluPala;
        /// <summary>Pulun vuoro valmis (web onPuluValmis).</summary>
        public event Action PuluValmis;
        /// <summary>Pelaajalle näytettävä virhe (web onVirhe).</summary>
        public event Action<string> Virhe;

        public RealtimeTila Tila { get; private set; } = RealtimeTila.Valmis;
        public bool Kaynnissa => Tila != RealtimeTila.Valmis;
        public string ViimeVirhe { get; private set; }

        /// <summary>Yksi WebSocket-yhteys ja sen taustasäikeiden jaettu tila.</summary>
        sealed class Yhteys
        {
            public ClientWebSocket Ws;
            public readonly CancellationTokenSource Peru = new CancellationTokenSource();
            public readonly SemaphoreSlim Lahetys = new SemaphoreSlim(1, 1);
            public readonly Kompressori Kompressori = Kompressori.Lukija();   // vain vastaanottosäie
            public AaniJono Jono;                                             // Unity-toisto, muuten null
            public volatile bool Suljettu;
        }

        readonly ConcurrentQueue<(Yhteys Y, RealtimeTapahtuma T, int Oma)> jono = new ConcurrentQueue<(Yhteys, RealtimeTapahtuma, int)>();
        // Omat jonotapahtumat (Oma ≠ 0): linja sulkeutui tai katkesi taustasäikeessä.
        const int OmaSuljettu = 1, OmaKatkesi = 2;

        Yhteys yhteys;
        int sukupolvi;           // Aloita ja Lopeta kasvattavat: vanha käynnistys ei jatku
        bool kanavaAuki;
        double alkuS, viimeAaniS;
        int enintaanS = PuluRealtimeLogiikka.EnintaanOletusS;
        volatile float soittoTaso = 1f;
        AudioSource lahde;
        AudioClip klippi;
        Puhe kuunneltuPuhe;

        public static PuluRealtime Hae()
        {
            if (Instanssi != null) return Instanssi;
            var go = new GameObject("MatkakirjaPuluRealtime");
            DontDestroyOnLoad(go);
            return go.AddComponent<PuluRealtime>();
        }

        void Awake()
        {
            if (Instanssi != null && Instanssi != this) { Destroy(gameObject); return; }
            Instanssi = this;
            // Sanelu ottaa mikrofonin ja ääni-istunnon: keskustelu pois alta (web: kaksi mikkiä ei kilpaile).
            Sanelu.Alkoi += SaneluAlkoi;
        }

        void OnDestroy()
        {
            Sanelu.Alkoi -= SaneluAlkoi;
            Lopeta();
            if (Instanssi == this) Instanssi = null;
        }

        void OnApplicationPause(bool tauolla) { if (tauolla) Lopeta(); }

        void SaneluAlkoi() { if (Kaynnissa) Lopeta(); }

        void PuheMuuttui(bool puhuu)
        {
            // Luenta alkoi kesken keskustelun (mikrofoni kuulisi sen, ja MatkakirjaAani_Toisto vaihtaa istunnon).
            if (puhuu && Kaynnissa) { Ilmoita("Äänikeskustelu päättyi, koska luenta alkoi."); Lopeta(); }
        }

        // --- aloitus ---------------------------------------------------------------------------------

        /// <summary>Aloittaa keskustelun (web aloita). Kesken oleva jätetään ennalleen.</summary>
        public void Aloita(string konteksti)
        {
            if (Kaynnissa) return;
            int oma = ++sukupolvi;
            ViimeVirhe = null;
            AsetaTila(RealtimeTila.Yhdistaa);
            StartCoroutine(Kaynnista(oma, konteksti ?? ""));
        }

        /// <summary>Napin vipu (web vaihdaRealtime): käynnissä → lopeta, muuten aloita.</summary>
        public void Vaihda(string konteksti)
        {
            if (Kaynnissa) Lopeta();
            else Aloita(konteksti);
        }

        IEnumerator Kaynnista(int oma, string konteksti)
        {
            if (!Saatavilla) { Ilmoita(VainLaitteella); Lopeta(); yield break; }

            // 1. Mikrofonilupa ensin (web: getUserMedia napautuksen eleestä ennen verkkoa).
            int lupa = NatLupa();
            if (lupa == LupaKysymatta)
            {
                NatPyydaLupa();
                float raja = Time.realtimeSinceStartup + 120f;
                while ((lupa = NatLupa()) == LupaKysymatta && Time.realtimeSinceStartup < raja)
                {
                    if (oma != sukupolvi) yield break;
                    yield return null;
                }
            }
            if (oma != sukupolvi) yield break;
            if (lupa != LupaMyonnetty) { Ilmoita(lupa == LupaEiKuvausta ? PuluRealtimeLogiikka.EiKaynnistynyt : EiLupaa); Lopeta(); yield break; }

            // 2. Sanelu ja luenta pois (web lopetaSanelu, peruLuenta, pysaytaLukija).
            if (Sanelu.Kaynnissa) Sanelu.Peruuta();
            var puhe = Puhe.Instanssi;
            if (puhe != null && (puhe.Soi || puhe.SoivaUrl != null)) puhe.Pysayta(0.2f);

            // 3. Token ja valmis istunto workerilta.
            string aani = Striimiaani.Valittu ?? Striimiaani.Oletus;   // web striimiaani() ?? STRIIMIAANI_OLETUS
            RealtimeToken token;
            using (var r = TokenPyynto(PuluRealtimeLogiikka.TokenRunko(konteksti, aani)))
            {
                yield return r.SendWebRequest();
                if (oma != sukupolvi) yield break;
                token = PuluRealtimeLogiikka.LueToken(r.responseCode, r.downloadHandler?.text);
                if (!token.Ok)
                    Debug.LogWarning($"MATKAKIRJA pulu realtime: token ei onnistunut ({r.responseCode} {token.Virhe}{(r.error != null ? ", " + r.error : "")})");
            }
            if (!token.Ok) { Ilmoita(token.Viesti); Lopeta(); yield break; }
            enintaanS = token.EnintaanS;

            // 4. WebSocket xAI:hin tokenilla (aliprotokolla kuten realtime-koe.mjs ja selain).
            var y = new Yhteys { Jono = UnityToisto ? new AaniJono(PuluRealtimeLogiikka.Taajuus * 30) : null };
            Task avaus;
            try
            {
                var osoite = new Uri(token.Osoite);
                y.Ws = new ClientWebSocket();
                y.Ws.Options.AddSubProtocol(PuluRealtimeLogiikka.Aliprotokolla(token.Token));
                avaus = Task.Run(() => y.Ws.ConnectAsync(osoite, y.Peru.Token));
            }
            catch (Exception e)
            {
                Debug.LogWarning("MATKAKIRJA pulu realtime: yhteyttä ei voitu aloittaa: " + e.Message);
                y.Ws?.Dispose();
                Ilmoita(PuluRealtimeLogiikka.EiAuennutLinja);
                Lopeta();
                yield break;
            }
            yhteys = y;
            while (!avaus.IsCompleted) yield return null;
            if (oma != sukupolvi) yield break;   // Lopeta sulki jo yhteyden
            if (avaus.IsFaulted || avaus.IsCanceled || y.Ws.State != WebSocketState.Open)
            {
                Debug.LogWarning("MATKAKIRJA pulu realtime: WebSocket ei auennut: " + avaus.Exception?.GetBaseException().Message);
                Ilmoita(PuluRealtimeLogiikka.EiAuennutLinja);
                Lopeta();
                yield break;
            }
            Debug.Log($"MATKAKIRJA pulu realtime: linja auki (aliprotokolla {y.Ws.SubProtocol ?? "-"}), enintään {enintaanS} s");
            _ = Task.Run(() => Vastaanota(y));
            // session.update ennen ensimmäistä ääntä (realtime-koe.mjs odottaa session.updated; web lähettää heti).
            var paivitys = Task.Run(() => Laheta(y, PuluRealtimeLogiikka.IstuntoPaivitys(token.Istunto)));
            while (!paivitys.IsCompleted) yield return null;
            if (oma != sukupolvi) yield break;
            if (paivitys.IsFaulted || paivitys.IsCanceled)
            {
                Debug.LogWarning("MATKAKIRJA pulu realtime: session.update ei lähtenyt: " + paivitys.Exception?.GetBaseException().Message);
                Ilmoita(PuluRealtimeLogiikka.Katkesi);
                Lopeta();
                yield break;
            }

            // 5. Mikrofoni ja kaiutin vasta kun linja on auki.
            int tulos = NatAloita();
            if (tulos != 0)
            {
                Debug.LogWarning("MATKAKIRJA pulu realtime: puhekanava ei auennut, koodi " + tulos);
                Ilmoita(tulos == 1 ? EiLupaa : EiMikrofonia);
                Lopeta();
                yield break;
            }
            kanavaAuki = true;
            if (y.Jono != null) AloitaUnityToisto(y.Jono);
            soittoTaso = Puhe.LukijanTaso;
            alkuS = viimeAaniS = Time.realtimeSinceStartupAsDouble;
            kuunneltuPuhe = Puhe.Instanssi;
            if (kuunneltuPuhe != null) kuunneltuPuhe.Puhuu += PuheMuuttui;
            _ = Task.Run(() => Mikrofoni(y));
            AsetaTila(RealtimeTila.Kuuntelee);
        }

        static UnityWebRequest TokenPyynto(string runko)
        {
            // Kuten Puhe.cs SynteesiPyynto: natiivin tunnisteet ja kehittäjäkoodi (worker vaatii sen reitille).
            var r = new UnityWebRequest(Lukijaaani.Palvelin, UnityWebRequest.kHttpVerbPOST)
            {
                uploadHandler = new UploadHandlerRaw(Encoding.UTF8.GetBytes(runko)) { contentType = "application/json" },
                downloadHandler = new DownloadHandlerBuffer(),
                timeout = 20,
            };
            r.SetRequestHeader("Content-Type", "application/json");
            r.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
            r.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
            var koodi = Asetukset.PolloKoodi;
            if (koodi != null) r.SetRequestHeader(Lukijaaani.KoodiOtsake, koodi);
            return r;
        }

        void AloitaUnityToisto(AaniJono aaniJono)
        {
            if (lahde == null)
            {
                lahde = gameObject.AddComponent<AudioSource>();
                lahde.playOnAwake = false;
                lahde.spatialBlend = 0;
                lahde.priority = 0;
            }
            // Striimaava klippi: äänisäie hakee näytteet jonosta, tyhjänä hiljaisuutta.
            klippi = AudioClip.Create("PuluRealtime", PuluRealtimeLogiikka.Taajuus, 1, PuluRealtimeLogiikka.Taajuus, true,
                data => aaniJono.Lue(data));
            lahde.clip = klippi;
            lahde.loop = true;
            lahde.volume = 1f;
            lahde.Play();
        }

        // --- taustasäikeet ---------------------------------------------------------------------------

        static async Task Laheta(Yhteys y, string teksti)
        {
            if (y.Suljettu) return;
            var tavut = Encoding.UTF8.GetBytes(teksti);
            await y.Lahetys.WaitAsync(y.Peru.Token).ConfigureAwait(false);
            try
            {
                if (y.Ws.State == WebSocketState.Open)
                    await y.Ws.SendAsync(new ArraySegment<byte>(tavut), WebSocketMessageType.Text, true, y.Peru.Token).ConfigureAwait(false);
            }
            finally { y.Lahetys.Release(); }
        }

        async Task Vastaanota(Yhteys y)
        {
            var puskuri = new byte[32 * 1024];
            var kooste = new MemoryStream();
            try
            {
                while (!y.Suljettu && y.Ws.State == WebSocketState.Open)
                {
                    var r = await y.Ws.ReceiveAsync(new ArraySegment<byte>(puskuri), y.Peru.Token).ConfigureAwait(false);
                    if (r.MessageType == WebSocketMessageType.Close)
                    {
                        Debug.Log($"MATKAKIRJA pulu realtime: palvelin sulki linjan ({r.CloseStatus} {r.CloseStatusDescription})");
                        break;
                    }
                    kooste.Write(puskuri, 0, r.Count);
                    if (!r.EndOfMessage) continue;
                    string teksti = Encoding.UTF8.GetString(kooste.GetBuffer(), 0, (int)kooste.Length);
                    kooste.SetLength(0);
                    var t = PuluRealtimeLogiikka.Jasenna(teksti);
                    switch (t.Laji)
                    {
                        case RealtimeLaji.Ohita:
                            break;
                        case RealtimeLaji.Aani:
                            Soita(y, t.Teksti);
                            jono.Enqueue((y, new RealtimeTapahtuma(RealtimeLaji.Aani), 0));   // base64 ei pääsäikeeseen
                            break;
                        case RealtimeLaji.PuheAlkoi:
                            Vaienna(y);
                            jono.Enqueue((y, t, 0));
                            break;
                        default:
                            jono.Enqueue((y, t, 0));
                            break;
                    }
                }
                if (!y.Suljettu) jono.Enqueue((y, default, OmaSuljettu));
            }
            catch (OperationCanceledException) { }
            catch (Exception e)
            {
                if (!y.Suljettu)
                {
                    Debug.LogWarning("MATKAKIRJA pulu realtime: vastaanotto katkesi: " + e.GetBaseException().Message);
                    jono.Enqueue((y, default, OmaKatkesi));
                }
            }
        }

        async Task Mikrofoni(Yhteys y)
        {
            // Enintään ~320 ms kerralla (jos lähetys on hetken jäljessä); tyhjä luku ei lähetä mitään.
            var puskuri = new byte[PuluRealtimeLogiikka.LahetysTavut * 8];
            try
            {
                while (!y.Suljettu && y.Ws.State == WebSocketState.Open)
                {
                    await Task.Delay(PuluRealtimeLogiikka.LahetysMs, y.Peru.Token).ConfigureAwait(false);
                    int n = NatLue(puskuri, puskuri.Length);
                    if (n <= 0 || y.Suljettu) continue;
                    await Laheta(y, PuluRealtimeLogiikka.AppendViesti(puskuri, 0, n)).ConfigureAwait(false);
                }
            }
            catch (OperationCanceledException) { }
            catch (Exception e)
            {
                if (!y.Suljettu)
                {
                    Debug.LogWarning("MATKAKIRJA pulu realtime: lähetys katkesi: " + e.GetBaseException().Message);
                    jono.Enqueue((y, default, OmaKatkesi));
                }
            }
        }

        /// <summary>Vastausääni soittoon (vastaanottosäie): lukijan taso + kompressori kuten Puhe.cs:n synteesi.</summary>
        void Soita(Yhteys y, string base64)
        {
            if (y.Suljettu) return;
            var n = PuluRealtimeLogiikka.PcmFloat(base64);
            if (n.Length == 0) return;
            float taso = soittoTaso;
            for (int i = 0; i < n.Length; i++) n[i] *= taso;
            y.Kompressori.Prosessoi(n, 1, PuluRealtimeLogiikka.Taajuus);
            if (y.Jono != null) y.Jono.Kirjoita(n, n.Length);
            else NatSoita(n, n.Length);
        }

        static void Vaienna(Yhteys y)
        {
            if (y.Jono != null) y.Jono.Tyhjenna();
            else NatVaienna();
            y.Kompressori.Nollaa();
        }

        // --- pääsäie ---------------------------------------------------------------------------------

        void Update()
        {
            while (jono.TryDequeue(out var v))
            {
                if (v.Y != yhteys || v.Y == null) continue;   // vanhan yhteyden jälkijättöinen
                try { Kasittele(v.T, v.Oma); }
                catch (Exception e) { Debug.LogException(e); }
            }
            if (yhteys == null || !kanavaAuki) return;
            soittoTaso = Puhe.LukijanTaso;
            double nyt = Time.realtimeSinceStartupAsDouble;
            if (NatTila() == TilaKeskeytetty) { Ilmoita(Keskeytyi); Lopeta(); return; }
            if (PuluRealtimeLogiikka.AikaLoppui(alkuS, nyt, enintaanS)) { Ilmoita(PuluRealtimeLogiikka.AikaTaynna); Lopeta(); return; }
            // Web soita → onended: kaikki soitettu → kuuntelee. Pieni armonaika palojen väliin.
            if (PuluRealtimeLogiikka.SoittoLoppui(Tila, Jonossa) && nyt - viimeAaniS > 0.25) AsetaTila(RealtimeTila.Kuuntelee);
        }

        int Jonossa => yhteys?.Jono != null ? yhteys.Jono.Maara : NatJonossa();

        void Kasittele(RealtimeTapahtuma t, int oma)
        {
            if (oma == OmaSuljettu) { Lopeta(); return; }   // web close avauksen jälkeen: loppu ilman virhettä
            if (oma == OmaKatkesi) { Ilmoita(PuluRealtimeLogiikka.Katkesi); Lopeta(); return; }
            var seuraava = PuluRealtimeLogiikka.SeuraavaTila(Tila, t.Laji);
            switch (t.Laji)
            {
                case RealtimeLaji.Aani:
                    viimeAaniS = Time.realtimeSinceStartupAsDouble;
                    break;
                case RealtimeLaji.VuoroPaattyi:
                    Laukaise(KayttajaAlku);
                    break;
                case RealtimeLaji.Kayttaja:
                    try { Kayttaja?.Invoke(t.Teksti ?? ""); } catch (Exception e) { Debug.LogException(e); }
                    break;
                case RealtimeLaji.PuluPala:
                    try { PuluPala?.Invoke(t.Teksti); } catch (Exception e) { Debug.LogException(e); }
                    break;
                case RealtimeLaji.PuluValmis:
                    Laukaise(PuluValmis);
                    break;
                case RealtimeLaji.Virhe:
                    Ilmoita(t.Teksti);
                    break;
                case RealtimeLaji.IstuntoPaivitetty:
                    Debug.Log("MATKAKIRJA pulu realtime: session.updated");
                    break;
            }
            if (seuraava.HasValue) AsetaTila(seuraava.Value);
        }

        static void Laukaise(Action a)
        {
            try { a?.Invoke(); } catch (Exception e) { Debug.LogException(e); }
        }

        void Ilmoita(string viesti)
        {
            if (string.IsNullOrEmpty(viesti)) return;
            ViimeVirhe = viesti;
            Debug.Log("MATKAKIRJA pulu realtime: " + viesti);
            try { Virhe?.Invoke(viesti); } catch (Exception e) { Debug.LogException(e); }
        }

        void AsetaTila(RealtimeTila t)
        {
            if (Tila == t) return;
            Tila = t;
            Debug.Log("MATKAKIRJA pulu realtime: tila " + t);
            try { TilaMuuttui?.Invoke(t); } catch (Exception e) { Debug.LogException(e); }
        }

        // --- lopetus ---------------------------------------------------------------------------------

        /// <summary>Lopetus: nappi, chatin sulku, aikaraja, keskeytys tai virhe. Turvallinen kutsua monesti.</summary>
        public void Lopeta()
        {
            if (!Kaynnissa && yhteys == null && !kanavaAuki) return;
            sukupolvi++;
            var y = yhteys;
            yhteys = null;
            if (y != null) Sulje(y);
            if (kanavaAuki)
            {
                kanavaAuki = false;
                NatLopeta();
            }
            if (lahde != null) { lahde.Stop(); lahde.clip = null; }
            if (klippi != null) { Destroy(klippi); klippi = null; }
            if (kuunneltuPuhe != null) kuunneltuPuhe.Puhuu -= PuheMuuttui;
            kuunneltuPuhe = null;
            while (jono.TryDequeue(out _)) { }
            AsetaTila(RealtimeTila.Valmis);
        }

        static void Sulje(Yhteys y)
        {
            y.Suljettu = true;
            Task.Run(async () =>
            {
                // Siisti sulku sekunnin sisällä (xAI laskuttaa yhteysajasta), sitten kaikki taustasäikeet poikki.
                try
                {
                    using (var aika = new CancellationTokenSource(1000))
                    {
                        if (y.Ws != null && y.Ws.State == WebSocketState.Open)
                        {
                            await y.Lahetys.WaitAsync(aika.Token).ConfigureAwait(false);
                            try { await y.Ws.CloseOutputAsync(WebSocketCloseStatus.NormalClosure, "lopetus", aika.Token).ConfigureAwait(false); }
                            finally { y.Lahetys.Release(); }
                        }
                    }
                }
                catch (Exception) { /* aikakatkaisu tai jo kiinni */ }
                try { y.Peru.Cancel(); } catch (Exception) { }
                try { y.Ws?.Abort(); } catch (Exception) { }
                try { y.Ws?.Dispose(); } catch (Exception) { }
            });
        }

        /// <summary>Kehittäjäkomennon tila (pulu realtime tila).</summary>
        public string Kuvaus
        {
            get
            {
                string aika = kanavaAuki ? $", jäljellä {Math.Max(0, enintaanS - (Time.realtimeSinceStartupAsDouble - alkuS)):0} s" : "";
                return $"tila {Tila}, kanava {(kanavaAuki ? "auki" : "kiinni")}, toisto {(UnityToisto ? "unity" : "natiivi")}"
                    + $", lupa {LupaTeksti(Saatavilla ? NatLupa() : -1)}{aika}, jonossa {(kanavaAuki ? Jonossa : 0)}"
                    + $", viimeisin virhe {ViimeVirhe ?? "-"}";
            }
        }

        static string LupaTeksti(int lupa) =>
            lupa == LupaMyonnetty ? "myönnetty" : lupa == LupaEvatty ? "evätty" : lupa == LupaKysymatta ? "kysymättä"
            : lupa == LupaEiKuvausta ? "Info.plist ilman kuvausta" : "ei iOS";

        // --- natiivikanava (Plugins/iOS/MatkakirjaPuhekanava.mm) ------------------------------------

        const int LupaKysymatta = 0, LupaMyonnetty = 1, LupaEvatty = 2, LupaEiKuvausta = 3;
        const int TilaKeskeytetty = 2;

#if UNITY_IOS && !UNITY_EDITOR
        static bool Saatavilla => Application.platform == RuntimePlatform.IPhonePlayer;

        [DllImport("__Internal")] static extern int MatkakirjaPuhekanava_Lupa();
        [DllImport("__Internal")] static extern void MatkakirjaPuhekanava_PyydaLupa();
        [DllImport("__Internal")] static extern int MatkakirjaPuhekanava_Aloita();
        [DllImport("__Internal")] static extern void MatkakirjaPuhekanava_Lopeta();
        [DllImport("__Internal")] static extern int MatkakirjaPuhekanava_Tila();
        [DllImport("__Internal")] static extern int MatkakirjaPuhekanava_Lue(byte[] puskuri, int max);
        [DllImport("__Internal")] static extern int MatkakirjaPuhekanava_Soita(float[] naytteet, int maara);
        [DllImport("__Internal")] static extern void MatkakirjaPuhekanava_Vaienna();
        [DllImport("__Internal")] static extern int MatkakirjaPuhekanava_Jonossa();

        static int NatLupa() => MatkakirjaPuhekanava_Lupa();
        static void NatPyydaLupa() => MatkakirjaPuhekanava_PyydaLupa();
        static int NatAloita() => MatkakirjaPuhekanava_Aloita();
        static void NatLopeta() => MatkakirjaPuhekanava_Lopeta();
        static int NatTila() => MatkakirjaPuhekanava_Tila();
        static int NatLue(byte[] p, int max) => MatkakirjaPuhekanava_Lue(p, max);
        static void NatSoita(float[] n, int maara) => MatkakirjaPuhekanava_Soita(n, maara);
        static void NatVaienna() => MatkakirjaPuhekanava_Vaienna();
        static int NatJonossa() => MatkakirjaPuhekanava_Jonossa();
#else
        static bool Saatavilla => false;
        static int NatLupa() => LupaEvatty;
        static void NatPyydaLupa() { }
        static int NatAloita() => 4;
        static void NatLopeta() { }
        static int NatTila() => 0;
        static int NatLue(byte[] p, int max) => 0;
        static void NatSoita(float[] n, int maara) { }
        static void NatVaienna() { }
        static int NatJonossa() => 0;
#endif
    }
}
