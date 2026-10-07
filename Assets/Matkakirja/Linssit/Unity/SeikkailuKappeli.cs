// HISTORIAMOOTTORI E3a: KAPPELIN KOHTAUS JA PIMEYS (Siirtoseppä 7.10.2026; docs/raportit/kasikirjoitus-olavinlinna-kappeli-e3.md
// vaiheet 1–2). Fogg astuu kaari-ovelle (ovi:kappeli-alku, 2 m) → valmis Kappeli-keskustelu soi (29 s, kertoja ei puhu), kappalainen
// alttarilla ja vouti oven käytävässä. Vouti lähtee 2 s viimeisen vuoron jälkeen pääovelle ja katoaa. Kappalainen sammuttaa liekit
// kaukaisimmasta alkaen (kruunu, pulpetti, sivualttarit, lattiajalat), kahden viimeisen kohdalla kappalainen-1, sytyttää lyhtynsä ja
// sammuttaa viimeisen, kävelee reittiä (reitti:kappalainen-5 → 1) pääovelle ja lukitsee; lyhdyn valo himmenee. Tallennuspiste "pimeä
// kappeli". Kappelin kohtaushahmot piilotetaan (DioraamaHahmot3D.PiilotetutTilat) ja korvataan liikkuvilla pelin hahmoilla.
// Jos Fogg astuu valaistuun kappeliin kohtauksen aikana: kappalainen-3 (E3c vie tyrmään; nyt tarkistuspisteeseen kaari-ovelle).
using System;
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuKappeli : MonoBehaviour
    {
        public static SeikkailuKappeli Aktiivinen { get; private set; }
        public enum Vaihe { Odottaa, Kohtaus, Pimeys, Pimea, Paluu }
        public Vaihe Nyt { get; private set; } = Vaihe.Odottaa;
        public const float AlkuM = 2.0f, Askel = 1.1f, SammutusS = 1.4f;

        Transform kappalainen, vouti; Light lyhty;
        string kappalainenLeike = "idle", voutiLeike = "idle"; double kappalainenAika, voutiAika;
        Vector3 ovi, alttari; readonly List<Vector3> reitti = new List<Vector3>();
        AudioSource keskustelu;
        // E3b: voudin sääntö (VoudinKierros) — hehku portaikon yläpäässä, askeleet holvin yllä, kiinni → tallennuspiste.
        readonly VoudinKierros voudinKierros = new VoudinKierros();
        Light hehku; AudioSource voudinAskeleet; Vector3 portaikkoYla, keskus;
        bool tavallinenAani, kovaAani; VoudinTila voudinEdellinen;
        public VoudinKierros Vouti => voudinKierros;
        Action<string> kirjaa;
        public Vector3 Tallennus { get; private set; }

        public static SeikkailuKappeli Luo(Transform isa, Rakennus rakennus, DioraamaHahmot3D hahmot, AudioClip keskusteluKlippi, Action<string> kirjaa)
        {
            Poista();
            var d = SeikkailuKavely.Data;
            if (d == null) { kirjaa?.Invoke("seikkailu: kappeli: kävelydata puuttuu"); return null; }
            KavelyMerkki m0 = null;
            foreach (var m in d.Merkit) if (m.Nimi == "ovi:kappeli-alku") m0 = m;
            if (m0 == null) { kirjaa?.Invoke("seikkailu: kappeli: ovi:kappeli-alku puuttuu"); return null; }
            var go = new GameObject("Seikkailu kappeli");
            go.transform.SetParent(isa, false);
            var k = go.AddComponent<SeikkailuKappeli>();
            k.kirjaa = kirjaa;
            k.ovi = U(m0);
            var r = new SortedDictionary<string, Vector3>(StringComparer.Ordinal);
            foreach (var m in d.Lajia("reitti")) if (m.Tunnus.StartsWith("kappalainen-", StringComparison.Ordinal) && m.Tunnus.IndexOf("paluu", StringComparison.Ordinal) < 0 && m.Tunnus.IndexOf("luukku", StringComparison.Ordinal) < 0) r[m.Tunnus] = U(m);
            k.reitti.AddRange(r.Values);
            k.alttari = k.reitti.Count > 0 ? k.reitti[k.reitti.Count - 1] : k.ovi;
            k.Tallennus = k.ovi;
            // Pelin hahmot: kappalainen alttarilla, vouti oven käytävässä (reitin alku).
            k.kappalainen = new GameObject("Kappalainen").transform; k.kappalainen.SetParent(go.transform, false); k.kappalainen.position = k.alttari;
            k.vouti = new GameObject("Vouti").transform; k.vouti.SetParent(go.transform, false); k.vouti.position = k.reitti.Count > 0 ? k.reitti[0] : k.ovi;
            KatsoKohti(k.kappalainen, k.alttari + Vector3.forward); KatsoKohti(k.vouti, k.alttari);
            hahmot?.LisaaIrrallinen(rakennus, "kappalainen-1500", k.kappalainen, () => (k.kappalainenLeike, k.kappalainenAika), Quaternion.Euler(0f, 180f, 0f));
            hahmot?.LisaaIrrallinen(rakennus, "vouti-1500", k.vouti, () => (k.voutiLeike, k.voutiAika), Quaternion.Euler(0f, 180f, 0f));
            DioraamaHahmot3D.PiilotetutTilat.Add("kappeli");
            var lg = new GameObject("Lyhty"); lg.transform.SetParent(k.kappalainen, false); lg.transform.localPosition = new Vector3(0.3f, 1.0f, 0.2f);
            k.lyhty = lg.AddComponent<Light>(); k.lyhty.type = LightType.Point; k.lyhty.range = 2.5f; k.lyhty.color = new Color(1f, 0.78f, 0.5f);
            k.lyhty.intensity = 1.6f; k.lyhty.shadows = LightShadows.None; k.lyhty.enabled = false;
            KavelyMerkki py = null; foreach (var m in d.Merkit) if (m.Nimi == "portaikko:ylapaa") py = m;
            k.portaikkoYla = py != null ? U(py) : k.ovi + Vector3.up * 3.0f;
            k.keskus = (k.ovi + k.alttari) * 0.5f;
            var hg = new GameObject("Voudin hehku"); hg.transform.SetParent(go.transform, false); hg.transform.position = k.portaikkoYla;
            k.hehku = hg.AddComponent<Light>(); k.hehku.type = LightType.Point; k.hehku.range = 3f; k.hehku.color = new Color(1f, 0.75f, 0.45f); k.hehku.intensity = 0f; k.hehku.shadows = LightShadows.None;
            k.voudinAskeleet = SeikkailuKuulija.Lahde("Voudin askeleet", 3f, 25f); k.voudinAskeleet.loop = true; k.voudinAskeleet.volume = 0.7f;
            SeikkailuEsineet.Kolahti += k.Kova; SeikkailuEsineet.Aanteli += k.Tavallinen; SeikkailuEsineet.Raapaistiin += k.Raapaisu; SeikkailuEsineet.Nostettiin += k.Nosto; SeikkailuKynttilat.LuukkuAani += k.Tavallinen; SeikkailuEsineet.AsetettiinAlttarille += k.Asetettu;
            SeikkailuEsineet.Alttari = k.alttari;
            if (keskusteluKlippi != null) { k.keskustelu = go.AddComponent<AudioSource>(); k.keskustelu.clip = keskusteluKlippi; k.keskustelu.spatialBlend = 0f; k.keskustelu.playOnAwake = false; }
            Aktiivinen = k;
            kirjaa?.Invoke($"seikkailu: kappeli valmis (reitti {k.reitti.Count} pistettä, keskustelu {(keskusteluKlippi != null ? keskusteluKlippi.length.ToString("F1") + " s" : "puuttuu")})");
            return k;
        }

        static Vector3 U(KavelyMerkki m) => new Vector3((float)m.X, (float)m.Y, (float)-m.Z);
        static void KatsoKohti(Transform t, Vector3 p) { var d = p - t.position; d.y = 0; if (d.sqrMagnitude > 1e-4f) t.rotation = Quaternion.LookRotation(d); }

        void Update()
        {
            kappalainenAika += Time.deltaTime; voutiAika += Time.deltaTime;
            var p = SeikkailuPelaaja.Aktiivinen;
            if (Nyt == Vaihe.Pimea || Nyt == Vaihe.Paluu) PaivitaVouti(p);
            if (Nyt == Vaihe.Pimea && !paluuTehty && (raapaistu || Time.time - pimeaAlku > PaluuS)) StartCoroutine(Paluu());
            if (Nyt == Vaihe.Odottaa && p != null && Vector3.Distance(p.transform.position, ovi) < AlkuM) StartCoroutine(Kohtaus());
            // Valaistuun kappeliin kohtauksen tai sammutuksen aikana (yli 2,5 m kaari-ovelta kohti alttaria): kappalainen näkee.
            if ((Nyt == Vaihe.Kohtaus || Nyt == Vaihe.Pimeys) && p != null && !nahty && Vector3.Distance(p.transform.position, ovi) > 2.5f
                && Vector3.Distance(p.transform.position, alttari) < Vector3.Distance(ovi, alttari) + 0.5f)
                StartCoroutine(Nahty(p));
        }

        void Kova(Vector3 p) => kovaAani = true;
        void Tavallinen(Vector3 p) => tavallinenAani = true;

        /// <summary>E3b: voudin sääntö pimeässä kappelissa (kohtauksen ja kappalaisen käynnin aikana pois).</summary>
        void PaivitaVouti(SeikkailuPelaaja p)
        {
            var ky = SeikkailuKynttilat.Aktiivinen;
            bool portaikossa = p != null && Vector3.Distance(p.transform.position, ovi) < 1.5f;
            var s = new VoudinSyote
            {
                ValoNakyy = ky != null && (ky.Ydin.Palavia > 0 || ky.Ydin.OmaPalaa && portaikossa),
                TavallinenAani = tavallinenAani, KovaAani = kovaAani, FoggPortaikossa = portaikossa,
                KappalainenHuoneessa = Nyt != Vaihe.Pimea,
            };
            tavallinenAani = kovaAani = false;
            voudinKierros.Paivita(Time.deltaTime, s);
            // Sydämenlyönti voudin pysähtyessä, laskeutuessa ja katsoessa sekä kappalaisen paluun aikana (käsikirjoitus kohdat 3 ja 7).
            if (p != null) SeikkailuAanet.Silmukka("sydan", voudinKierros.Sydan || Nyt == Vaihe.Paluu, p.transform.position + Vector3.up * 1.2f, 0.8f);
            if (voudinKierros.Tila != voudinEdellinen) { kirjaa?.Invoke($"seikkailu: vouti {voudinEdellinen} → {voudinKierros.Tila}"); voudinEdellinen = voudinKierros.Tila; }
            // Hehku: portaikon yläpää, laskeutuessa liukuu kaari-ovelle.
            hehku.transform.position = Vector3.Lerp(portaikkoYla, ovi + Vector3.up * 1.6f, (float)voudinKierros.Laskeutuminen);
            hehku.intensity = (float)voudinKierros.Hehku * 1.4f;
            // Askeleet holvin yllä (ampumakäytävä ~lattia + 4,1 m, säde ~3,9 m), pysähtyvät pysähdyksessä ja katseessa.
            double a = voudinKierros.Vaihe * Math.PI * 2;
            var ap = voudinKierros.Tila == VoudinTila.Kierros ? keskus + new Vector3((float)Math.Cos(a) * 3.9f, 4.1f, (float)Math.Sin(a) * 3.9f) : hehku.transform.position;
            SeikkailuKuulija.Aseta(voudinAskeleet, ap);
            if (voudinAskeleet.clip == null && SeikkailuVartijat.AskelKlippi != null) voudinAskeleet.clip = SeikkailuVartijat.AskelKlippi;
            bool kavelee = voudinKierros.Tila == VoudinTila.Kierros || voudinKierros.Tila == VoudinTila.Laskeutuu;
            if (kavelee && voudinAskeleet.clip != null && !voudinAskeleet.isPlaying) voudinAskeleet.Play();
            else if (!kavelee && voudinAskeleet.isPlaying) voudinAskeleet.Stop();
            if (voudinKierros.Tila == VoudinTila.Kiinni && p != null)
            {
                // Äänetön kiinniotto (vouti tarttuu olkaan) → E3c tyrmä; nyt tallennuspisteeseen "pimeä kappeli" ja valppaus.
                kirjaa?.Invoke("seikkailu: vouti otti Foggin kiinni (tyrmä → pimeä kappeli)");
                p.Siirra(Tallennus);
                voudinKierros.Tyrmasta();
            }
        }

        // --- E3c: kappalaisen paluu (vaihe 7) ---
        public const float PaluuS = 100f, LyhtyM = 2.5f, VaroitusS = 6f;
        bool paluuTehty, raapaistu; float pimeaAlku;
        void Raapaisu() => raapaistu = true;

        IEnumerator Paluu()
        {
            paluuTehty = true; Nyt = Vaihe.Paluu;
            kirjaa?.Invoke($"seikkailu: kappalainen palaa ({(raapaistu ? "raapaisu" : "100 s")})");
            var reunaOvi = reitti.Count > 0 ? reitti[0] : ovi;
            // Valo oven alle (lyhty oven takana), 2 s myöhemmin kappalainen-2 vaimeana oven läpi, avain kääntyy, ovi aukeaa 1,5 s myöhemmin.
            kappalainen.gameObject.SetActive(true);
            kappalainen.position = reunaOvi + (reunaOvi - alttari).normalized * 1.2f;
            lyhty.enabled = true; lyhty.intensity = 0f;
            for (float t = 0; t < 2f; t += Time.deltaTime) { lyhty.intensity = Mathf.Lerp(0f, 0.8f, t / 2f); yield return null; }
            double kesto = SeikkailuRepliikit.Aktiivinen?.Soita("kappalainen-2", kappalainen) ?? 0;
            yield return new WaitForSeconds((float)Math.Max(1.0, kesto));
            SeikkailuAanet.Soita("avain-lukko", kappalainen.position + Vector3.up, 0.8f);   // avain kääntyy repliikin lopussa
            yield return new WaitForSeconds(1.5f);
            lyhty.intensity = 1.6f;
            // Sisään: pulpetille (reitin puoliväli) ja takaisin; pysähtyy, nuuhkaisee, kohottaa lyhtyä.
            var sisaan = new List<Vector3> { reunaOvi };
            if (reitti.Count > 2) sisaan.Add(reitti[reitti.Count / 2]);
            kappalainenLeike = "kavely";
            foreach (var q in sisaan) { yield return Kavele(kappalainen, new List<Vector3> { q }, a => kappalainenAika = a); if (Nahtiinko()) { yield return KappalainenNakee(); yield break; } }
            kappalainenLeike = "idle";
            for (float t = 0; t < 3f; t += Time.deltaTime) { if (Nahtiinko()) { yield return KappalainenNakee(); yield break; } yield return null; }
            kappalainenLeike = "kavely";
            yield return Kavele(kappalainen, new List<Vector3> { reunaOvi, reunaOvi + (reunaOvi - alttari).normalized * 1.2f }, a => kappalainenAika = a);
            for (float t = 0; t < 1.2f; t += Time.deltaTime) { lyhty.intensity = Mathf.Lerp(1.6f, 0f, t / 1.2f); yield return null; }
            kappalainen.gameObject.SetActive(false);
            Nyt = Vaihe.Pimea;
            kirjaa?.Invoke("seikkailu: kappalainen lähti kirjan kanssa, ovi lukossa");
        }

        /// <summary>Näkeekö kappalainen: Fogg lyhdyn valopiirissä (2,5 m) tai Foggin liekki palaa (näkyy pääovelle) muualla kuin kaari-oven syvennyksessä.</summary>
        bool Nahtiinko()
        {
            var p = SeikkailuPelaaja.Aktiivinen; if (p == null) return false;
            float d = Vector3.Distance(p.transform.position, kappalainen.position);
            bool syvennyksessa = Vector3.Distance(p.transform.position, ovi) < 1.2f;
            var ky = SeikkailuKynttilat.Aktiivinen;
            return d < LyhtyM || ky != null && ky.Ydin.OmaPalaa && !syvennyksessa;
        }

        IEnumerator KappalainenNakee()
        {
            kirjaa?.Invoke("seikkailu: kappalainen näki Foggin (kappalainen-3 → vartija)");
            double k3 = SeikkailuRepliikit.Aktiivinen?.Soita("kappalainen-3", kappalainen) ?? 0;
            yield return new WaitForSeconds((float)Math.Max(1.5, k3) + 1f);
            double k1 = SeikkailuRepliikit.Aktiivinen?.Soita("vartija-kiinni-1", kappalainen) ?? 0;
            yield return new WaitForSeconds((float)Math.Max(1.5, k1));
            double k2 = SeikkailuRepliikit.Aktiivinen?.Soita("vartija-kiinni-2", kappalainen) ?? 0;
            yield return new WaitForSeconds((float)Math.Max(1.5, k2));
            // Tyrmä (ehdotus 2.7): äänetön pako myöhemmin; nyt suoraan tallennuspisteeseen "pimeä kappeli", kohtaus ei toistu.
            var p = SeikkailuPelaaja.Aktiivinen; if (p != null) p.Siirra(Tallennus);
            lyhty.intensity = 0f; kappalainen.gameObject.SetActive(false);
            voudinKierros.Tyrmasta();
            paluuTehty = false; raapaistu = false; pimeaAlku = Time.time;   // "kerran yritystä kohden"
            Nyt = Vaihe.Pimea;
        }

        // --- E3d: löytö (vaihe 10) Natiivi-UI:n Paljastus-pohjalla (SeikkailuTapit.NaytaLoyto heijastuksella) ---
        bool loydetty;
        void Nosto(string id)
        {
            if (loydetty || id != "kalkki" && id != "pateeni" && id != "liuskekivi") return;
            loydetty = true;
            kirjaa?.Invoke("seikkailu: löytö: kalkki, pateeni ja liuskekivi");
            var pl = SeikkailuPelaaja.Aktiivinen;
            if (pl != null) { SeikkailuAanet.Soita("liina-avaus", pl.transform.position + Vector3.up, 0.8f); SeikkailuAanet.Soita("hopea-kilahdus", pl.transform.position + Vector3.up * 1.1f, 0.7f); }
            var t = typeof(SeikkailuKappeli).Assembly.GetType("Matkakirja.Natiivi.SeikkailuTapit");
            var m = t?.GetMethod("NaytaLoyto", System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static);
            if (m == null) { kirjaa?.Invoke("seikkailu: löytö: SeikkailuTapit.NaytaLoyto puuttuu"); return; }
            try
            {
                m.Invoke(null, new object[] { "Kappelin kätkö",
                    "Liinaan kääritty hopeinen kalkki ja pateeni sekä liuskekivi, johon on kaiverrettu kaksi toisiaan kohti kallistuvaa kilpeä, kaari ja pieni kello.",
                    null, null, (Action)(() => { kirjaa?.Invoke("seikkailu: löytö kuitattu (Jatka matkaa)"); StartCoroutine(Alttarille()); }) });
            }
            catch (Exception e) { kirjaa?.Invoke("seikkailu: löytö: " + (e.InnerException?.Message ?? e.Message)); }
        }

        // --- E3d vaihe 11: kalkki alttarille (10 s:n jälkeen Fogg tekee sen itse), liuskekivi laukkuun, Pulu kujertaa, nousu ---
        readonly HashSet<string> alttarilla = new HashSet<string>(StringComparer.Ordinal);
        bool loppu;
        void Asetettu(string id) { alttarilla.Add(id); if (!loppu && alttarilla.Contains("kalkki") && alttarilla.Contains("pateeni")) StartCoroutine(Loppu()); }

        IEnumerator Alttarille()
        {
            yield return new WaitForSeconds(10f);
            var es = SeikkailuEsineet.Aktiivinen;
            if (es == null || loppu) yield break;
            foreach (var id in new[] { "kalkki", "pateeni", "liuskekivi" }) if (!alttarilla.Contains(id)) es.AsetaAlttarille(id);
        }

        IEnumerator Loppu()
        {
            loppu = true;
            var es = SeikkailuEsineet.Aktiivinen;
            if (es != null && !alttarilla.Contains("liuskekivi")) es.AsetaAlttarille("liuskekivi");
            yield return new WaitForSeconds(1.2f);
            var p = SeikkailuPelaaja.Aktiivinen;
            SeikkailuAanet.Soita("pulu-kujerrus", (p != null ? p.transform.position : alttari) + Vector3.up * 1.7f, 0.9f);
            kirjaa?.Invoke("seikkailu: pelattava pala: loppu (kalkki alttarilla, liuskekivi laukussa)");
            yield return new WaitForSeconds(1.5f);
            var kamera = FindKamera();
            if (kamera == null) yield break;
            DioraamaSovitin.KameraVapaa = true;
            var t = typeof(SeikkailuKappeli).Assembly.GetType("Matkakirja.Natiivi.SeikkailuNousu");
            var m = t?.GetMethod("Aloita", System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static);
            Action valmis = () => kirjaa?.Invoke("seikkailu: pelattava pala valmis (nousu päättyi)");
            if (m != null) { try { m.Invoke(null, new object[] { kamera, kamera.position, valmis }); yield break; } catch (Exception e) { kirjaa?.Invoke("seikkailu: SeikkailuNousu: " + (e.InnerException?.Message ?? e.Message)); } }
            // Varanousu (kunnes LS2:n SeikkailuNousu on mukana): holvin läpi 80 m linnan ylle katse alas keskukseen, 9 s.
            var alku = kamera.position; var loppuP = keskus + new Vector3(-40f, 80f, -60f);
            for (float s = 0; s < 1f; s += Time.deltaTime / 9f)
            {
                float u = s * s * (3 - 2 * s);
                kamera.position = Vector3.Lerp(alku, loppuP, u);
                kamera.rotation = Quaternion.Slerp(kamera.rotation, Quaternion.LookRotation(keskus - kamera.position), Time.deltaTime * 2f);
                yield return null;
            }
            valmis();
        }

        Transform FindKamera()
        {
            var n = GetComponentInParent<DioraamaNayttamo>();
            return n != null && n.Kamera != null ? n.Kamera.transform : null;
        }

        bool nahty;
        IEnumerator Nahty(SeikkailuPelaaja p)
        {
            nahty = true;
            keskustelu?.Stop();
            kirjaa?.Invoke("seikkailu: kappalainen näki Foggin valaistussa kappelissa");
            double kesto = SeikkailuRepliikit.Aktiivinen?.Soita("kappalainen-3", kappalainen) ?? 0;
            yield return new WaitForSeconds((float)Math.Max(1.5, kesto));
            // E3c: vartija → tyrmä. Nyt: tarkistuspisteeseen kaari-ovelle ja kohtaus alusta.
            p.Siirra(Tallennus - (alttari - ovi).normalized * 0.8f);
            StopAllCoroutines();
            Nyt = Vaihe.Odottaa; nahty = false;
            kappalainen.position = alttari; vouti.position = reitti.Count > 0 ? reitti[0] : ovi;
            kappalainenLeike = voutiLeike = "idle"; lyhty.enabled = false;
            var ky = SeikkailuKynttilat.Aktiivinen; if (ky != null) for (int i = 0; i < ky.Ydin.Maara; i++) ky.Ydin.Aseta(i, true);
        }

        IEnumerator Kohtaus()
        {
            Nyt = Vaihe.Kohtaus;
            kirjaa?.Invoke("seikkailu: kappelin kohtaus alkaa");
            float kesto = 29.2f;
            if (keskustelu != null && keskustelu.clip != null) { keskustelu.Play(); kesto = keskustelu.clip.length; }
            kappalainenLeike = "puhe"; voutiLeike = "puhe";
            yield return new WaitForSeconds(kesto + 2f);
            // Vouti lähtee pääovesta (reitin alku → ovi, sitten katoaa holvin yllä).
            voutiLeike = "kavely";
            yield return Kavele(vouti, new List<Vector3> { reitti.Count > 0 ? reitti[0] : ovi, reitti.Count > 0 ? reitti[0] + (reitti[0] - alttari).normalized * 2f : ovi }, a => voutiAika = a);
            vouti.gameObject.SetActive(false);
            yield return Pimeys();
        }

        IEnumerator Pimeys()
        {
            Nyt = Vaihe.Pimeys;
            var ky = SeikkailuKynttilat.Aktiivinen;
            if (ky != null && ky.Ydin.Maara > 0)
            {
                // Järjestys kaukaisimmasta alttarilta lähimpään; kaksi lähintä viimeisinä (kappalainen-1).
                var jarjestys = new List<int>();
                for (int i = 0; i < ky.Ydin.Maara; i++) jarjestys.Add(i);
                var paikat = Paikat(ky);
                jarjestys.Sort((a, b) => Vector3.Distance(paikat[b], alttari).CompareTo(Vector3.Distance(paikat[a], alttari)));
                for (int n = 0; n < jarjestys.Count; n++)
                {
                    int i = jarjestys[n];
                    if (n == jarjestys.Count - 2)
                    {
                        double kesto = SeikkailuRepliikit.Aktiivinen?.Soita("kappalainen-1", kappalainen) ?? 0;
                        lyhty.enabled = true;   // sytyttää lyhtynsä viimeisestä kynttilästä
                        yield return new WaitForSeconds((float)Math.Max(2.0, kesto - 0.6));
                    }
                    var kohde = paikat[i]; kohde.y = kappalainen.position.y;
                    var kohti = kohde + (kappalainen.position - kohde).normalized * 0.6f;
                    kappalainenLeike = "kavely";
                    yield return Kavele(kappalainen, new List<Vector3> { kohti }, a => kappalainenAika = a);
                    kappalainenLeike = "tyo"; KatsoKohti(kappalainen, kohde);
                    yield return new WaitForSeconds(SammutusS * 0.5f);
                    ky.Ydin.Aseta(i, false);
                    SeikkailuAanet.Soita("sammutin", kohde + Vector3.up * 1.0f, 0.7f);
                    yield return new WaitForSeconds(SammutusS * 0.5f);
                }
            }
            // Pääovelle reittiä takaisin ja lukitus; lyhdyn valo himmenee oven takana.
            kappalainenLeike = "kavely";
            var takaisin = new List<Vector3>(reitti); takaisin.Reverse();
            yield return Kavele(kappalainen, takaisin, a => kappalainenAika = a);
            SeikkailuAanet.Soita("avain-lukko", kappalainen.position + Vector3.up, 0.8f);   // lukitsee pääoven ulkopuolelta
            for (float t = 0; t < 1.5f; t += Time.deltaTime) { lyhty.intensity = Mathf.Lerp(1.6f, 0f, t / 1.5f); yield return null; }
            kappalainen.gameObject.SetActive(false);
            Nyt = Vaihe.Pimea; pimeaAlku = Time.time;
            Tallennus = SeikkailuPelaaja.Aktiivinen != null ? SeikkailuPelaaja.Aktiivinen.transform.position : ovi;
            kirjaa?.Invoke("seikkailu: kappeli pimeä (tallennuspiste)");
        }

        static List<Vector3> Paikat(SeikkailuKynttilat ky)
        {
            var l = new List<Vector3>();
            foreach (var x in ky.LiekkiPaikat()) l.Add(x);
            return l;
        }

        IEnumerator Kavele(Transform t, List<Vector3> pisteet, Action<double> aika)
        {
            foreach (var q in pisteet)
            {
                var kohde = new Vector3(q.x, t.position.y, q.z);
                KatsoKohti(t, kohde);
                while ((t.position - kohde).sqrMagnitude > 0.01f)
                {
                    t.position = Vector3.MoveTowards(t.position, kohde, Askel * Time.deltaTime);
                    yield return null;
                }
            }
        }

        public static void Poista() { var a = Aktiivinen; Aktiivinen = null; if (a != null) Destroy(a.gameObject); }

        void OnDestroy()
        {
            if (Aktiivinen == this) Aktiivinen = null;
            DioraamaHahmot3D.PiilotetutTilat.Remove("kappeli");
            SeikkailuEsineet.Kolahti -= Kova; SeikkailuEsineet.Aanteli -= Tavallinen; SeikkailuEsineet.Raapaistiin -= Raapaisu; SeikkailuEsineet.Nostettiin -= Nosto; SeikkailuKynttilat.LuukkuAani -= Tavallinen; SeikkailuEsineet.AsetettiinAlttarille -= Asetettu; SeikkailuEsineet.Alttari = null;
            if (voudinAskeleet != null) Destroy(voudinAskeleet.gameObject);
        }
    }
}
