// HISTORIAMOOTTORI E3a: KAPPELIN KOHTAUS JA PIMEYS (Siirtoseppä 7.10.2026; docs/raportit/kasikirjoitus-olavinlinna-kappeli-e3.md
// vaiheet 1–2). Fogg astuu kaari-ovelle (ovi:kappeli-alku, 2 m) → valmis Kappeli-keskustelu soi (29 s, kertoja ei puhu), kappalainen
// alttarilla ja vouti oven käytävässä. Vouti lähtee 2 s viimeisen vuoron jälkeen pääovelle ja katoaa. Kappalainen sammuttaa liekit
// kaukaisimmasta alkaen (kruunu, pulpetti, sivualttarit, lattiajalat), kahden viimeisen kohdalla kappalainen-1, sytyttää lyhtynsä ja
// sammuttaa viimeisen, kävelee reittiä (reitti:kappalainen-5 → 1) pääovelle ja lukitsee; lyhdyn valo himmenee. Tallennuspiste "pimeä
// kappeli". Kappelin kohtaushahmot piilotetaan (DioraamaHahmot3D.PiilotetutTilat) ja korvataan liikkuvilla pelin hahmoilla.
// Jos Fogg astuu valaistuun kappeliin kohtauksen aikana: kappalainen-3 (E3c vie tyrmään; nyt tarkistuspisteeseen kaari-ovelle).
// Arvoitusmalli (Ydin KappelinArvoitus, LS2 8.10.): vaiheet 1–11 tapahtumista ja kynttilätilasta; vaiheen eteneminen nollaa Pulun
// jumiajastimen ja tallentaa (SeikkailuTallentaja, Arvoitus kappeli*). Ajastimet (100 s, 6 s, 10 s) pysyvät tässä luokassa.
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
        Vector3? kaariOvi, syvennys, varjo;
        List<Vector3> paluuReitti = new List<Vector3>(), luukkuReitti = new List<Vector3>(), voudinReitti = new List<Vector3>(), laskeutuminen = new List<Vector3>();
        readonly List<Vector3> hehkuPolku = new List<Vector3>();
        bool tavallinenAani, kovaAani; VoudinTila voudinEdellinen;
        public VoudinKierros Vouti => voudinKierros;
        Action<string> kirjaa;
        public Vector3 Tallennus { get; private set; }
        /// <summary>Kappelin valoarvoituksen vaiheet 1–11 (Pulun vihjeet, tallennus).</summary>
        public KappelinArvoitus Arvoitus { get; } = new KappelinArvoitus();
        /// <summary>Kappeli on jo ratkaistu (jatko tallennuksesta huoneisiin 6–10): ei kohtausta eikä voudin kierrosta uudelleen.</summary>
        public bool Ratkaistu { get; private set; }

        /// <summary>Koko peli 1–10 (Siirtoseppä 8.10.): jatko tallennuksesta, jossa kalkki ja pateeni ovat alttarilla, palauttaa ratkaistun
        /// kappelin (pimeä, löytö alttarilla). Kesken jäänyt arvoitus alkaa tarkistuspisteestä alusta kuten ennen.</summary>
        public void Palauta(SeikkailuTallennus t)
        {
            var a = KappelinArvoitus.Lue(t);
            if (!(a.KalkkiAlttarilla && a.PateeniAlttarilla)) return;
            Ratkaistu = true; loppu = true; loydetty = true;
            alttarilla.Add("kalkki"); alttarilla.Add("pateeni"); alttarilla.Add("liuskekivi");
            if (SeikkailuKynttilat.Aktiivinen is SeikkailuKynttilat ky) for (int i = 0; i < ky.Ydin.Maara; i++) ky.Ydin.Aseta(i, false);
            SeikkailuEsineet.Aktiivinen?.PalautaKappeli();
            kirjaa?.Invoke("seikkailu: jatko: kappeli ratkaistu (löytö alttarilla), ei kohtausta");
        }
        readonly List<Vector3> kilvet = new List<Vector3>(), vedot = new List<Vector3>();
        public const float KilpiM = 1.0f;

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
            k.reitti.AddRange(Reitti(d, "kappalainen-"));
            // v44i (Linnanrakentaja): paluureitti pääovi → pulpetti, muunnelma luukulle, voudin kierros ampumakäytävässä ja laskeutuminen
            // portaikkoa kaari-ovelle; piilot kaari-oven syvennys ja alttarin varjo. Puuttuessa vanhat paikkamerkit.
            k.paluuReitti = Reitti(d, "kappalainen-paluu-"); k.luukkuReitti = Reitti(d, "kappalainen-luukku-");
            k.voudinReitti = Reitti(d, "vouti-"); k.laskeutuminen = Reitti(d, "vouti-laskeutuminen-");
            foreach (var m in d.Merkit) if (m.Nimi == "ovi:kaari-ovi") k.kaariOvi = U(m); else if (m.Nimi == "piilo:kaari-ovi") k.syvennys = U(m); else if (m.Nimi == "piilo:alttarin-varjo") k.varjo = U(m);
            foreach (var m in d.Merkit) if (m.Nimi.StartsWith("esine:kilpilaatta-", StringComparison.Ordinal)) k.kilvet.Add(U(m)); else if (m.Laji == "veto") k.vedot.Add(U(m));
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
            if (k.kaariOvi == null) k.kaariOvi = k.ovi;
            if (k.syvennys == null) k.syvennys = k.kaariOvi;
            // Hehkun polku: portaikon yläpää → laskeutumisen loput pisteet kaari-ovelle (lyhty 1,4 m lattiasta).
            k.hehkuPolku.Add(k.portaikkoYla);
            int ia = k.laskeutuminen.FindIndex(q => (q - k.portaikkoYla).sqrMagnitude < 0.04f);
            for (int i = ia + 1; ia >= 0 && i < k.laskeutuminen.Count; i++) k.hehkuPolku.Add(k.laskeutuminen[i]);
            if (k.hehkuPolku.Count < 2) k.hehkuPolku.Add(k.kaariOvi.Value);
            for (int i = 0; i < k.hehkuPolku.Count; i++) k.hehkuPolku[i] += Vector3.up * 1.4f;
            var hg = new GameObject("Voudin hehku"); hg.transform.SetParent(go.transform, false); hg.transform.position = k.portaikkoYla;
            k.hehku = hg.AddComponent<Light>(); k.hehku.type = LightType.Point; k.hehku.range = 3f; k.hehku.color = new Color(1f, 0.75f, 0.45f); k.hehku.intensity = 0f; k.hehku.shadows = LightShadows.None;
            k.voudinAskeleet = SeikkailuKuulija.Lahde("Voudin askeleet", 3f, 25f); k.voudinAskeleet.loop = true; k.voudinAskeleet.volume = 0.7f;
            SeikkailuPako.Valmis -= k.PakoValmis; SeikkailuPako.Valmis += k.PakoValmis;   // M-osa: nousu pakon jälkeen (myös jatkossa tallennuksesta)
            SeikkailuEsineet.Kolahti += k.Kova; SeikkailuEsineet.Aanteli += k.Tavallinen; SeikkailuEsineet.Raapaistiin += k.Raapaisu; SeikkailuEsineet.Nostettiin += k.Nosto; SeikkailuKynttilat.LuukkuAani += k.Tavallinen; SeikkailuEsineet.AsetettiinAlttarille += k.Asetettu;
            SeikkailuEsineet.Aanteli += k.Koputus;
            SeikkailuEsineet.Alttari = k.alttari;
            if (keskusteluKlippi != null) { k.keskustelu = go.AddComponent<AudioSource>(); k.keskustelu.clip = keskusteluKlippi; k.keskustelu.spatialBlend = 0f; k.keskustelu.playOnAwake = false; }
            Aktiivinen = k;
            kirjaa?.Invoke($"seikkailu: kappeli valmis (reitti {k.reitti.Count} pistettä, keskustelu {(keskusteluKlippi != null ? keskusteluKlippi.length.ToString("F1") + " s" : "puuttuu")})");
            return k;
        }

        static Vector3 U(KavelyMerkki m) => new Vector3((float)m.X, (float)m.Y, (float)-m.Z);

        /// <summary>Reitin pisteet järjestyksessä: reitti:&lt;etuliite&gt;&lt;numero&gt; (pelkkä numero, ei pidempiä nimiä kuten vouti-laskeutuminen-1).</summary>
        static List<Vector3> Reitti(KavelyData d, string etuliite)
        {
            var r = new SortedDictionary<int, Vector3>();
            foreach (var m in d.Lajia("reitti"))
                if (m.Tunnus.StartsWith(etuliite, StringComparison.Ordinal) && int.TryParse(m.Tunnus.Substring(etuliite.Length), out int n)) r[n] = U(m);
            return new List<Vector3>(r.Values);
        }

        /// <summary>Piste murtoviivalla osuudella u (0–1) pituuden mukaan; suljettu = viimeisestä takaisin ensimmäiseen.</summary>
        static Vector3 Polulla(List<Vector3> l, double u, bool suljettu)
        {
            if (l.Count == 0) return Vector3.zero;
            if (l.Count == 1) return l[0];
            int n = suljettu ? l.Count : l.Count - 1; float pit = 0;
            for (int i = 0; i < n; i++) pit += Vector3.Distance(l[i], l[(i + 1) % l.Count]);
            float jaljella = (float)(u - Math.Floor(u)) * pit; if (!suljettu && u >= 1) return l[l.Count - 1];
            for (int i = 0; i < n; i++)
            {
                var a = l[i]; var b = l[(i + 1) % l.Count]; float s = Vector3.Distance(a, b);
                if (jaljella <= s) return Vector3.Lerp(a, b, s > 0 ? jaljella / s : 0);
                jaljella -= s;
            }
            return l[suljettu ? 0 : l.Count - 1];
        }

        /// <summary>Fogg portaikossa: kaari-ovella tai laskeutumisreitin portailla (ei ampumakäytävässä, jonne pelaaja ei pääse).</summary>
        bool Portaikossa(Vector3 p)
        {
            if (Vector3.Distance(p, kaariOvi.Value) < 1.0f) return true;
            foreach (var q in laskeutuminen)
                if (q.y < portaikkoYla.y - 0.5f && q.y > kaariOvi.Value.y + 0.5f && Vector3.Distance(p, q) < 1.5f) return true;
            return false;
        }
        static void KatsoKohti(Transform t, Vector3 p) { var d = p - t.position; d.y = 0; if (d.sqrMagnitude > 1e-4f) t.rotation = Quaternion.LookRotation(d); }

        void Update()
        {
            kappalainenAika += Time.deltaTime; voutiAika += Time.deltaTime;
            var p = SeikkailuPelaaja.Aktiivinen;
            if (Nyt == Vaihe.Pimea || Nyt == Vaihe.Paluu) PaivitaVouti(p);
            PaivitaArvoitus(p);
            if (Nyt == Vaihe.Pimea && !paluuTehty && (raapaistu || Time.time - pimeaAlku > PaluuS)) StartCoroutine(Paluu());
            if (Nyt == Vaihe.Odottaa && !Ratkaistu && p != null && Vector3.Distance(p.transform.position, ovi) < AlkuM) StartCoroutine(Kohtaus());
            // Valaistuun kappeliin kohtauksen tai sammutuksen aikana (yli 2,5 m kaari-ovelta kohti alttaria): kappalainen näkee.
            if ((Nyt == Vaihe.Kohtaus || Nyt == Vaihe.Pimeys) && p != null && !nahty && Vector3.Distance(p.transform.position, ovi) > 2.5f
                && Vector3.Distance(p.transform.position, alttari) < Vector3.Distance(ovi, alttari) + 0.5f)
                StartCoroutine(Nahty(p));
        }

        void Kova(Vector3 p) => kovaAani = true;
        void Tavallinen(Vector3 p) => tavallinenAani = true;

        /// <summary>Arvoitusmalli joka kehys: kynttilätila (SeikkailuKynttilat), kilvet ja veto käden liekistä; eteneminen → Pulun
        /// jumiajastin nollaan, tallennuspiste → SeikkailuTallentaja.</summary>
        void PaivitaArvoitus(SeikkailuPelaaja p)
        {
            var ky = SeikkailuKynttilat.Aktiivinen; var a = Arvoitus;
            if (ky != null && Nyt != Vaihe.Odottaa)
            {
                bool saumat = ky.SaumatNakyvat;
                a.Havaitse(ky.Ydin.OmaPalaa, ky.OmaAsetettu != null && saumat, ky.OmaKadessa && saumat, ky.Ydin.Palavia > 0, ky.LuukkuAuki);
                if (ky.OmaKadessa && p != null && p.Kasi != null)
                {
                    var kasi = p.Kasi.position;
                    foreach (var q in kilvet) if (Vector3.Distance(kasi, q) < KilpiM) { a.Teko(KappeliTeko.LiekkiKilville); break; }
                    foreach (var q in vedot) if (Vector3.Distance(kasi, q) < SeikkailuKynttilat.VetoM) { a.Teko(KappeliTeko.LiekkiVetoon); break; }
                }
            }
            a.KappalainenTulee = false;   // paluun ajastus on tässä luokassa (raapaistu tai 100 s)
            if (a.Edistyi) { a.Edistyi = false; SeikkailuVihjeet.Aktiivinen?.Ydin.Edistys(); }
            if (a.Tallennettiin)
            {
                a.Tallennettiin = false;
                kirjaa?.Invoke($"seikkailu: kappelin vaihe {a.Vaihe}");
                var t = SeikkailuTallentaja.Aktiivinen; if (t != null) { a.Kirjoita(t.Tila); t.Tallenna($"kappeli vaihe {a.Vaihe}"); }
            }
        }

        void Koputus(Vector3 c) { if (SeikkailuKynttilat.Ontto is Vector3 o && Vector3.Distance(o, c) < 1.5f) Arvoitus.Teko(KappeliTeko.KoputaOntto); }

        /// <summary>E3b: voudin sääntö pimeässä kappelissa (kohtauksen ja kappalaisen käynnin aikana pois).</summary>
        void PaivitaVouti(SeikkailuPelaaja p)
        {
            var ky = SeikkailuKynttilat.Aktiivinen;
            bool portaikossa = p != null && Portaikossa(p.transform.position);
            bool syvennyksessa = p != null && Vector3.Distance(p.transform.position, syvennys.Value) < 1.0f;
            var s = new VoudinSyote
            {
                ValoNakyy = ky != null && (ky.Ydin.Palavia > 0 || ky.Ydin.OmaPalaa && (portaikossa || syvennyksessa)),
                TavallinenAani = tavallinenAani, KovaAani = kovaAani, FoggPortaikossa = portaikossa,
                KappalainenHuoneessa = Nyt != Vaihe.Pimea,
            };
            tavallinenAani = kovaAani = false;
            voudinKierros.Paivita(Time.deltaTime, s);
            // Sydämenlyönti voudin pysähtyessä, laskeutuessa ja katsoessa sekä kappalaisen paluun aikana (käsikirjoitus kohdat 3 ja 7).
            if (p != null) SeikkailuAanet.Silmukka("sydan", voudinKierros.Sydan || Nyt == Vaihe.Paluu, p.transform.position + Vector3.up * 1.2f, 0.8f);
            if (voudinKierros.Tila != voudinEdellinen)
            {
                kirjaa?.Invoke($"seikkailu: vouti {voudinEdellinen} → {voudinKierros.Tila}");
                // Valinnaiset repliikit (pelattavuusmalli 3.6, omistajan luvalla): epäily laskeutuessa, ote kiinniotossa; puuttuessa hiljaa.
                if (voudinKierros.Tila == VoudinTila.Laskeutuu) SeikkailuRepliikit.SoitaTaiVara("vouti-epaily-1", null, hehku.transform.position + Vector3.up * 0.4f);
                else if (voudinKierros.Tila == VoudinTila.Kiinni && p != null) SeikkailuRepliikit.SoitaTaiVara("vouti-ote-1", null, p.transform.position + Vector3.up * 1.6f);
                voudinEdellinen = voudinKierros.Tila;
            }
            // Hehku: portaikon yläpää, laskeutuessa portaikkoa alas kaari-ovelle (laskeutumisreitti).
            hehku.transform.position = Polulla(hehkuPolku, Math.Min(1.0, voudinKierros.Laskeutuminen), false);
            hehku.intensity = (float)voudinKierros.Hehku * 1.4f;
            // Askeleet holvin yllä ampumakäytävän reittiä (reitti:vouti-1…8), pysähtyvät pysähdyksessä ja katseessa.
            double a = voudinKierros.Vaihe * Math.PI * 2;
            var ap = voudinKierros.Tila != VoudinTila.Kierros ? hehku.transform.position
                : voudinReitti.Count >= 3 ? Polulla(voudinReitti, voudinKierros.Vaihe, true) + Vector3.up * 1.6f
                : keskus + new Vector3((float)Math.Cos(a) * 3.9f, 4.1f, (float)Math.Sin(a) * 3.9f);
            SeikkailuKuulija.Aseta(voudinAskeleet, ap);
            if (voudinAskeleet.clip == null && SeikkailuVartijat.AskelKlippi != null) voudinAskeleet.clip = SeikkailuVartijat.AskelKlippi;
            bool kavelee = voudinKierros.Tila == VoudinTila.Kierros || voudinKierros.Tila == VoudinTila.Laskeutuu;
            if (kavelee && voudinAskeleet.clip != null && !voudinAskeleet.isPlaying) voudinAskeleet.Play();
            else if (!kavelee && voudinAskeleet.isPlaying) voudinAskeleet.Stop();
            if (voudinKierros.Tila == VoudinTila.Kiinni && p != null)
            {
                // Äänetön kiinniotto (vouti tarttuu olkaan) → E3c tyrmä; nyt tallennuspisteeseen "pimeä kappeli" ja valppaus.
                kirjaa?.Invoke("seikkailu: vouti otti Foggin kiinni (tyrmä → pimeä kappeli)");
                voudinKierros.Tyrmasta();
                Arvoitus.Teko(KappeliTeko.Kiinni);
                Tyrmaan(p);
            }
        }

        // --- E3c: kappalaisen paluu (vaihe 7) ---
        public const float PaluuS = 100f, LyhtyM = 2.5f, VaroitusS = 6f;
        bool paluuTehty, raapaistu; float pimeaAlku;
        void Raapaisu()
        {
            if (SeikkailuTyrma.Aktiivinen != null) return;   // tyrmän irtokivi ei kutsu kappalaista
            raapaistu = true;
            if (!Arvoitus.Teko(KappeliTeko.Raapaise)) kirjaa?.Invoke("seikkailu: arvoitus: raapaisu, mutta mallissa saumat eivät näy (alttarikynttilä?)");
        }

        IEnumerator Paluu()
        {
            paluuTehty = true; Nyt = Vaihe.Paluu; Arvoitus.Teko(KappeliTeko.KappalainenTuli);
            kirjaa?.Invoke($"seikkailu: kappalainen palaa ({(raapaistu ? "raapaisu" : "100 s")})");
            var reunaOvi = reitti.Count > 0 ? reitti[0] : ovi;
            // Valo oven alle (lyhty oven takana), 2 s myöhemmin kappalainen-2 vaimeana oven läpi, avain kääntyy, ovi aukeaa 1,5 s myöhemmin.
            kappalainen.gameObject.SetActive(true);
            kappalainen.position = reunaOvi + (reunaOvi - alttari).normalized * 1.2f;
            lyhty.enabled = true; lyhty.intensity = 0f;
            SeikkailuPelaaja.Aktiivinen?.PyydaKaanto(reunaOvi);   // valo oven alla: käännössääntö (pelattavuusmalli 7.3)
            for (float t = 0; t < 2f; t += Time.deltaTime) { lyhty.intensity = Mathf.Lerp(0f, 0.8f, t / 2f); yield return null; }
            double kesto = SeikkailuRepliikit.Aktiivinen?.Soita("kappalainen-2", kappalainen) ?? 0;
            yield return new WaitForSeconds((float)Math.Max(1.0, kesto));
            SeikkailuAanet.Soita("avain-lukko", kappalainen.position + Vector3.up, 0.8f);   // avain kääntyy repliikin lopussa
            yield return new WaitForSeconds(1.5f);
            lyhty.intensity = 1.6f;
            // Sisään: pulpetille (reitti:kappalainen-paluu-1…4) ja takaisin; luukun ollessa auki muunnelma luukulle (kappalainen-luukku-1…4,
            // sulkee luukun) ja sieltä pulpetille. Pysähtyy, nuuhkaisee, kohottaa lyhtyä; ottaa kirjan.
            var ky = SeikkailuKynttilat.Aktiivinen;
            bool luukulle = ky != null && ky.LuukkuAuki && luukkuReitti.Count > 0;
            var sisaan = new List<Vector3>(luukulle ? luukkuReitti : paluuReitti);
            if (sisaan.Count == 0) { sisaan.Add(reunaOvi); if (reitti.Count > 2) sisaan.Add(reitti[reitti.Count / 2]); }
            var pulpetti = paluuReitti.Count > 0 ? paluuReitti[paluuReitti.Count - 1] : sisaan[sisaan.Count - 1];
            kappalainenLeike = "kavely";
            foreach (var q in sisaan) { yield return Kavele(kappalainen, new List<Vector3> { q }, a => kappalainenAika = a); if (Nahtiinko()) { yield return KappalainenNakee(); yield break; } }
            if (luukulle)
            {
                kappalainenLeike = "tyo"; yield return new WaitForSeconds(0.8f);
                if (ky.LuukkuAuki) ky.VaihdaLuukku();
                kappalainenLeike = "kavely";
                yield return Kavele(kappalainen, new List<Vector3> { pulpetti }, a => kappalainenAika = a);
                sisaan.Add(pulpetti);
            }
            kappalainenLeike = "idle";
            for (float t = 0; t < 3f; t += Time.deltaTime) { if (Nahtiinko()) { yield return KappalainenNakee(); yield break; } yield return null; }
            SeikkailuEsineet.Aktiivinen?.Piilota("kirja");   // kirja lähtee kappalaisen mukana
            kappalainenLeike = "kavely";
            var ulos = new List<Vector3>(sisaan); ulos.Reverse(); ulos.Add(reunaOvi); ulos.Add(reunaOvi + (reunaOvi - alttari).normalized * 1.2f);
            foreach (var q in ulos) { yield return Kavele(kappalainen, new List<Vector3> { q }, a => kappalainenAika = a); if (Nahtiinko()) { yield return KappalainenNakee(); yield break; } }
            for (float t = 0; t < 1.2f; t += Time.deltaTime) { lyhty.intensity = Mathf.Lerp(1.6f, 0f, t / 1.2f); yield return null; }
            kappalainen.gameObject.SetActive(false);
            Nyt = Vaihe.Pimea; Arvoitus.Teko(KappeliTeko.KappalainenLahti);
            kirjaa?.Invoke("seikkailu: kappalainen lähti kirjan kanssa, ovi lukossa");
        }

        /// <summary>Näkeekö kappalainen: Fogg lyhdyn valopiirissä (2,5 m; alttarin varjossa kyyryssä vain 1 m) tai Foggin liekki palaa
        /// (näkyy pääovelle) muualla kuin kaari-oven syvennyksessä.</summary>
        bool Nahtiinko()
        {
            var p = SeikkailuPelaaja.Aktiivinen; if (p == null) return false;
            var pp = p.transform.position;
            float d = Vector3.Distance(pp, kappalainen.position);
            bool syvennyksessa = Vector3.Distance(pp, syvennys.Value) < 1.0f || Vector3.Distance(pp, kaariOvi.Value) < 0.8f;
            bool varjossa = varjo is Vector3 v && Vector3.Distance(pp, v) < 0.7f && p.Tila.Tapa == Liiketapa.Hiipiminen;
            var ky = SeikkailuKynttilat.Aktiivinen;
            return d < (varjossa ? 1.0f : LyhtyM) || ky != null && ky.Ydin.OmaPalaa && !syvennyksessa;
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
            var p = SeikkailuPelaaja.Aktiivinen; if (p != null) Tyrmaan(p);
            lyhty.intensity = 0f; kappalainen.gameObject.SetActive(false);
            voudinKierros.Tyrmasta();
            paluuTehty = false; raapaistu = false; pimeaAlku = Time.time;   // "kerran yritystä kohden"
            Nyt = Vaihe.Pimea; Arvoitus.Teko(KappeliTeko.Kiinni);
        }

        /// <summary>E3c / pelattavuusmalli 4.1: kiinnijäänti kappelissa → tyrmä (jos merkit paketissa), sitten tallennuspiste "pimeä kappeli".</summary>
        void Tyrmaan(SeikkailuPelaaja p)
        {
            if (p == null) return;
            if (!SeikkailuTyrma.Aloita(transform.parent, p, () => { var q = SeikkailuPelaaja.Aktiivinen; if (q != null) q.Siirra(Tallennus); }, kirjaa)) p.Siirra(Tallennus);
        }

        // --- E3d: löytö (vaihe 10) Natiivi-UI:n Paljastus-pohjalla (SeikkailuTapit.NaytaLoyto heijastuksella) ---
        bool loydetty;
        void Nosto(string id)
        {
            if (id != "liinanyytti" && id != "kalkki" && id != "pateeni" && id != "liuskekivi") return;
            if (Arvoitus.KiviaIrti < KappelinArvoitus.Kivia) { kirjaa?.Invoke($"seikkailu: arvoitus: nyytti {Arvoitus.KiviaIrti} kivellä mallissa"); Arvoitus.KiviaIrti = KappelinArvoitus.Kivia; }
            Arvoitus.Teko(KappeliTeko.AvaaNyytti);
            if (loydetty) return;
            loydetty = true;
            kirjaa?.Invoke("seikkailu: löytö: kalkki, pateeni ja liuskekivi");
            var pl = SeikkailuPelaaja.Aktiivinen;
            if (pl != null) { SeikkailuAanet.Soita("liina-avaus", pl.transform.position + Vector3.up, 0.8f); SeikkailuAanet.Soita("hopea-kilahdus", pl.transform.position + Vector3.up * 1.1f, 0.7f); }
            // Löytömerkki (pelattavuusmalli 10, omistajan päätös 4): kanteleen 3–4 säveltä, aanet-fp-v1 "loyto-kantele" (puuttuessa hiljaa).
            if (pl != null) SeikkailuAanet.Soita("loyto-kantele", pl.transform.position + Vector3.up * 1.6f, 0.8f);
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
        void Asetettu(string id)
        {
            Arvoitus.Teko(id == "kalkki" ? KappeliTeko.KalkkiAlttarille : id == "pateeni" ? KappeliTeko.PateeniAlttarille : KappeliTeko.LiuskekiviLaukkuun);
            alttarilla.Add(id);
            if (!loppu && alttarilla.Contains("kalkki") && alttarilla.Contains("pateeni")) StartCoroutine(Loppu());
        }

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
            // M-osa (huoneet 6–10) mukana: kappeli ei pääty dronekuvaan, vaan pala jatkuu huoneeseen 6 ja K2-nousu siirtyy pakon loppuun
            // (K5 → drone nykyiseen linnaan, SeikkailuPako.Valmis).
            if (SeikkailuPako.Aktiivinen != null)
            {
                kirjaa?.Invoke("seikkailu: kappeli valmis, pala jatkuu huoneeseen 6 (nousu pakon jälkeen)");
                SeikkailuTallentaja.Aktiivinen?.Tallenna("kappeli valmis");
                yield break;
            }
            kirjaa?.Invoke("seikkailu: pelattava pala: loppu (kalkki alttarilla, liuskekivi laukussa)");
            yield return new WaitForSeconds(1.5f);
            yield return Nousu();
        }

        void PakoValmis() { SeikkailuPako.Valmis -= PakoValmis; kirjaa?.Invoke("seikkailu: pelattava pala: loppu (pako valmis, K5 → drone)"); StartCoroutine(Nousu()); }

        /// <summary>K2: drone nykyiseen linnaan (LS2:n SeikkailuNousu; varalla 9 s:n nousu), sitten tietokerroksen loppu ja tallennus pois.</summary>
        IEnumerator Nousu()
        {
            var kamera = FindKamera();
            if (kamera == null) yield break;
            DioraamaSovitin.KameraVapaa = true;
            SeikkailuKavely.AsetaVain1499(false);   // K2: drone nykyiseen linnaan, vuoden 1499 leikkaukset pois (bastionit näkyvät)
            var t = typeof(SeikkailuKappeli).Assembly.GetType("Matkakirja.Natiivi.SeikkailuNousu");
            var m = t?.GetMethod("Aloita", System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static);
            Action valmis = () => { kirjaa?.Invoke("seikkailu: pelattava pala valmis (nousu päättyi)"); SeikkailuTietokerros.Aktiivinen?.Loppu(); SeikkailuTallentaja.Aktiivinen?.Valmis(); };
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
            Nyt = Vaihe.Odottaa; nahty = false; Arvoitus.Teko(KappeliTeko.Kiinni);   // kohtaus alusta
            kappalainen.position = alttari; vouti.position = reitti.Count > 0 ? reitti[0] : ovi;
            kappalainenLeike = voutiLeike = "idle"; lyhty.enabled = false;
            var ky = SeikkailuKynttilat.Aktiivinen; if (ky != null) for (int i = 0; i < ky.Ydin.Maara; i++) ky.Ydin.Aseta(i, true);
        }

        IEnumerator Kohtaus()
        {
            Nyt = Vaihe.Kohtaus; Arvoitus.Teko(KappeliTeko.KohtausAlkoi);
            kirjaa?.Invoke("seikkailu: kappelin kohtaus alkaa");
            float kesto = 29.2f;
            if (keskustelu != null && keskustelu.clip != null) { keskustelu.Play(); kesto = keskustelu.clip.length; }
            kappalainenLeike = "puhe"; voutiLeike = "puhe";
            yield return new WaitForSeconds(kesto + 2f);
            // Vouti lähtee pääovesta (reitin alku → ovi, sitten katoaa holvin yllä).
            voutiLeike = "kavely";
            yield return Kavele(vouti, new List<Vector3> { reitti.Count > 0 ? reitti[0] : ovi, reitti.Count > 0 ? reitti[0] + (reitti[0] - alttari).normalized * 2f : ovi }, a => voutiAika = a);
            vouti.gameObject.SetActive(false);
            Arvoitus.Teko(KappeliTeko.VoutiLahti);
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
            Nyt = Vaihe.Pimea; pimeaAlku = Time.time; Arvoitus.Teko(KappeliTeko.OviLukittu);
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
            SeikkailuPako.Valmis -= PakoValmis;
            SeikkailuEsineet.Kolahti -= Kova; SeikkailuEsineet.Aanteli -= Tavallinen; SeikkailuEsineet.Raapaistiin -= Raapaisu; SeikkailuEsineet.Nostettiin -= Nosto; SeikkailuKynttilat.LuukkuAani -= Tavallinen; SeikkailuEsineet.AsetettiinAlttarille -= Asetettu; SeikkailuEsineet.Aanteli -= Koputus; SeikkailuEsineet.Alttari = null;
            if (voudinAskeleet != null) Destroy(voudinAskeleet.gameObject);
        }
    }
}
