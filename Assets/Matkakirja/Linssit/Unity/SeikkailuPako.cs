// HISTORIAMOOTTORI M-OSA HUONE 10: PAKO (Siirtoseppä 8.10.2026; pelattavuusmalli-olavinlinna.md 8.2 huone 10 ja kohta 7).
// Kulku: arkku auki → hälytyskello (kaikki valppaiksi) → köysi kramppiin (koysi:krampi-komero) → köysilasku takakuvassa (Ytimen Kiipeily
// 1 m:n otteina, lyhty pyyhkäisee puolivälissä 2 s:n varoituksella) → kallio ensimmäisessä persoonassa (reitti:pako-1…5) → kamera:K4
// (sukellus, kaukokuva 4 s) → uinti takakuvassa 12 s veneelle (vene:pako) → rannan vartija pitää kiinnitysköydestä: Katkaise (tai Töytäise,
// omistajan päätös 1) → K5 (virta vie veneen sumuun, 12 s) → valmis. Aikaraja: kalliolla 25 s kellon alusta rannan soihtuvartijat esiin
// (partio:ranta, SeikkailuVartijat.Odottavat), 45 s → kiinni (lähin vartija vie tyrmään). Ohjatut jaksot SeikkailuPelaaja.Ohjattu-kutsulla.
// Vaiheet ja ajat Ydin Pakossa (LS2 8.10.): uusi kiinnitys myöhästymisen jälkeen aloittaa 45 s:n ikkunan alusta (ennen jokainen uusi
// yritys myöhästyi heti kalliolle päästessä, koska kello jatkui).
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuPako : MonoBehaviour
    {
        public static SeikkailuPako Aktiivinen { get; private set; }
        public const float KramppiM = 1.6f, K4M = 2.5f;
        readonly Pako ydin = new Pako();
        Vector3 krampi, pako1, k4, k4Katse, k5, k5Katse, vene, koysi; bool k4On, k5On, veneOn;
        Vector3 sukellusAlku, uintiAlku; Action<string> kirjaa;
        public Pako Ydin => ydin;
        /// <summary>Pako päättyi (K5:n jälkeen): sovitin voi viedä drone-näkymään ja tietokerrokseen.</summary>
        public static event Action Valmis;
        /// <summary>Toimintonapin verbi ohjatun jakson aikana (SeikkailuEsineet lukee) ja sen teko.</summary>
        public static string OhjattuVerbi;
        public static Action OhjattuToimi;

        static Vector3 U(KavelyMerkki m) => new Vector3((float)m.X, (float)m.Y, (float)-m.Z);

        public static void Luo(KavelyData d, Transform isa, Action<string> kirjaa)
        {
            Poista();
            KavelyMerkki km = null, p1 = null, mk4 = null, mk5 = null, mv = null, mko = null;
            foreach (var m in d.Merkit)
            {
                if (m.Nimi == "koysi:krampi-komero") km = m; else if (m.Nimi == "reitti:pako-1") p1 = m; else if (m.Nimi == "kamera:K4") mk4 = m;
                else if (m.Nimi == "kamera:K5") mk5 = m; else if (m.Nimi == "vene:pako") mv = m; else if (m.Nimi == "koysi:vene-kiinnitys") mko = m;
            }
            if (km == null || p1 == null) return;
            var go = new GameObject("Seikkailu pako") { layer = DioraamaNayttamo.Kerros };
            go.transform.SetParent(isa, false);
            var s = go.AddComponent<SeikkailuPako>(); s.kirjaa = kirjaa; Aktiivinen = s;
            s.krampi = U(km); s.pako1 = U(p1);
            if (mk4 != null) { s.k4 = U(mk4); s.k4Katse = mk4.Katse != null ? new Vector3((float)mk4.Katse[0], (float)mk4.Katse[1], (float)-mk4.Katse[2]) : s.k4 + Vector3.forward; s.k4On = true; }
            if (mk5 != null) { s.k5 = U(mk5); s.k5Katse = mk5.Katse != null ? new Vector3((float)mk5.Katse[0], (float)mk5.Katse[1], (float)-mk5.Katse[2]) : s.k5 + Vector3.forward; s.k5On = true; }
            if (mv != null) { s.vene = U(mv); s.veneOn = true; }
            s.koysi = mko != null ? U(mko) : s.vene;
            // LR v45a: esine-koysi-vene.glb kahtena solmuna (koysi-ranta vartijan kädestä puoliväliin, koysi-vene puolivälistä keulaan).
            if (mko != null && !string.IsNullOrEmpty(mko.Glb))
                s.StartCoroutine(SeikkailuEsineet.LataaMalli(mko, go.transform, s.luodut, g => s.koysiMalli = g, kirjaa, new[] { "koysi-ranta", "koysi-vene" },
                    (n, t) => { if (n == "koysi-vene") s.koysiVene = t; }));
            SeikkailuKomero.ArkkuAuki -= s.Halytyskello; SeikkailuKomero.ArkkuAuki += s.Halytyskello;
            SeikkailuVartijat.Kiinnijaatiin -= s.Kiinni; SeikkailuVartijat.Kiinnijaatiin += s.Kiinni;
            kirjaa?.Invoke($"seikkailu: pako (K4 {(s.k4On ? "kyllä" : "ei")}, vene {(s.veneOn ? "kyllä" : "ei")})");
        }

        void Halytyskello()
        {
            if (ydin.Vaihe != PakoVaihe.Odottaa) return;
            ydin.ArkkuAuki(); ydin.KelloSoi = false;
            SeikkailuAanet.SoitaTaiVara("kello-halytys", "kello", krampi + Vector3.up * 6f, 1f);   // hälytyskello Kellotornissa (TULKINTA; ääni aanet-fp:hen tarvittaessa)
            SeikkailuVartijat.Valpastu();
            SeikkailuRepliikit.SoitaTaiVara("vartija-kello-1", "vartija-valpas-1", krampi + Vector3.up * 3f);   // "Kello soimaan!"
            kirjaa?.Invoke("seikkailu: hälytyskello soi, vartijat valppaina");
            SeikkailuTallentaja.Aktiivinen?.Tallenna("m: kello");
        }

        /// <summary>Toimintonapin verbi kävellessä (Kiinnitä krampin luona kellon jälkeen) tai null.</summary>
        public string Verbi(SeikkailuPelaaja p) => ydin.Vaihe == PakoVaihe.Kello && p != null && (p.transform.position + Vector3.up - krampi).sqrMagnitude < KramppiM * KramppiM * 2f ? Matkakirja.Peli.Tekstit.T("olavinlinna.verbi.kiinnita") : null;

        public bool Toimi(SeikkailuPelaaja p)
        {
            if (Verbi(p) == null) return false;
            // Köysilasku: otteet 1 m:n välein krampista kallion yläpäähän (keho riippuu otteesta 1,55 m), ulospäin kohti kalliota.
            var ala = pako1 + Vector3.up * SeikkailuPelaaja.OteRiippuu;
            var ulos = pako1 - krampi; ulos.y = 0; ulos = ulos.sqrMagnitude > 1e-4f ? ulos.normalized : Vector3.forward;
            int n = Mathf.Max(2, Mathf.CeilToInt(Vector3.Distance(krampi, ala)));
            var otteet = new List<(Vector3 P, Vector3 Ulos)>();
            for (int i = 0; i <= n; i++) otteet.Add((Vector3.Lerp(krampi, ala, i / (float)n), ulos));
            p.KasiEle("poiminta");
            SeikkailuAanet.SoitaTaiVara("koysi-kiinnitys", "lyhty-narina", krampi, 0.6f, 0.7f);
            ydin.Kiinnita();
            if (ydin.UusiYritys)
            {
                ydin.UusiYritys = false; kirjaa?.Invoke("seikkailu: pako: uusi yritys (45 s alusta)");
                SeikkailuVartijat.Odottamaan("ranta"); SeikkailuVartijat.Odottamaan("seisoo-ranta-vartija");
            }
            kirjaa?.Invoke($"seikkailu: köysi kramppiin → köysilasku ({n} m)");
            p.AloitaOteKiipeily(otteet, null, ok => { ydin.LaskuValmis(); kirjaa?.Invoke("seikkailu: kalliolla"); }, "koysilasku");
            return true;
        }

        void Update()
        {
            var p = SeikkailuPelaaja.Aktiivinen; if (p == null) return;
            // Kello, köysilasku ja kallio kulkevat tässä; ohjatut jaksot (K4…K5) SeikkailuPelaaja.Ohjattu-kutsussa.
            if (ydin.Vaihe != PakoVaihe.Kello && ydin.Vaihe != PakoVaihe.Lasku && ydin.Vaihe != PakoVaihe.Kallio) return;
            bool k4Lahella = k4On && new Vector2(p.transform.position.x - k4.x, p.transform.position.z - k4.z).sqrMagnitude < K4M * K4M;
            ydin.Paivita(Time.deltaTime, k4Lahella);
            if (ydin.RantaEsiin) { ydin.RantaEsiin = false; SeikkailuVartijat.Aktivoi("ranta"); SeikkailuRepliikit.SoitaTaiVara("ranta-soihtu-1", null, pako1 + Vector3.up * 1.6f); }
            if (ydin.Myohastyi) { ydin.Myohastyi = false; kirjaa?.Invoke("seikkailu: pako myöhästyi"); SeikkailuVartijat.Halyta(); return; }
            if (ydin.Sukelsi) { ydin.Sukelsi = false; AloitaSukellus(p); }
        }

        void AloitaSukellus(SeikkailuPelaaja p)
        {
            kirjaa?.Invoke("seikkailu: K4 sukellus");
            SeikkailuAanet.SoitaTaiVara("sukellus", null, p.transform.position, 0.9f);
            var alku = p.transform.position; sukellusAlku = alku;
            var vesi = veneOn ? vene.y : alku.y - 1f;
            uintiAlku = new Vector3(k4Katse.x, vesi, k4Katse.z);
            if (veneOn) uintiAlku = Vector3.Lerp(new Vector3(alku.x, vesi, alku.z), vene, 0.25f);
            p.Ohjattu = dt =>
            {
                ydin.Paivita(dt, false);
                float t = (float)ydin.VaiheS;
                // Silmukat (aanet-fp-v2): uinti uidessa, airot K5:ssä; puuttuessa hiljaa.
                SeikkailuAanet.Silmukka("uinti", ydin.Vaihe == PakoVaihe.Uinti, p.transform.position + Vector3.up * 1.4f, 0.8f);
                SeikkailuAanet.Silmukka("airot", ydin.Vaihe == PakoVaihe.K5, vene, 0.8f);
                if (ydin.UintiAlkoi) { ydin.UintiAlkoi = false; SeikkailuAanet.SoitaTaiVara("molskahdus", "vesisanko", p.transform.position, 0.9f, 0.6f); SeikkailuVartijat.Aktivoi("seisoo-ranta-vartija"); }
                if (ydin.SoutajaHuutaa) { ydin.SoutajaHuutaa = false; SeikkailuRepliikit.SoitaTaiVara("soutaja-pako-1", null, vene + Vector3.up * 1.2f); }   // "Tänne!"
                if (ydin.Veneessa) { ydin.Veneessa = false; AsetaKoysi(true); kirjaa?.Invoke("seikkailu: veneellä, vartija pitää köydestä"); }
                if (ydin.Katkaistu) Katkaistu();
                switch (ydin.Vaihe)
                {
                    case PakoVaihe.K4:
                        // Kaukokuva K4: sukellus salmeen kallion juurelta (hahmo pieni kuvassa).
                        p.Kuva(k4, k4Katse);
                        p.transform.position = Vector3.Lerp(sukellusAlku, uintiAlku - Vector3.up * 1.4f, Mathf.SmoothStep(0f, 1f, t / (float)Pako.K4S));
                        return true;
                    case PakoVaihe.Uinti:
                        {
                            // Uinti takakuvassa veneelle (virta kuljettaa); silmät vesirajassa.
                            var kohde = veneOn ? vene - (vene - uintiAlku).normalized * 1.2f : uintiAlku + Vector3.forward * 10f;
                            var pos = Vector3.Lerp(uintiAlku, kohde, t / (float)Pako.UintiS) - Vector3.up * 1.4f;
                            p.transform.position = pos;
                            var suunta = kohde - uintiAlku; suunta.y = 0; suunta = suunta.sqrMagnitude > 1e-4f ? suunta.normalized : Vector3.forward;
                            p.Hahmo.rotation = Quaternion.LookRotation(suunta);
                            p.AsetaLeike("uinti");
                            p.Kuva(pos - suunta * SeikkailuPelaaja.TakaM + Vector3.up * (SeikkailuPelaaja.Korkeus + SeikkailuPelaaja.TakaYlos), pos + Vector3.up * 1.4f + suunta * 2f);
                            return true;
                        }
                    case PakoVaihe.Koysi:
                        // Soutaja nostaa veneeseen (ensimmäinen persoona veneessä); vartija pitää kiinnitysköydestä: Katkaise (armo 20 s Ytimessä).
                        p.transform.position = vene;
                        p.Kuva(vene + Vector3.up * 1.0f, koysi, false);
                        return true;
                    case PakoVaihe.K5:
                        // Kaukokuva K5: virta vie veneen sumuun → drone (sovitin).
                        p.Kuva(k5On ? k5 : vene + new Vector3(10f, 6f, 10f), k5On ? k5Katse : vene, true);
                        if (k5On) p.transform.position = Vector3.Lerp(vene, k5Katse, Mathf.Clamp01(t / (float)Pako.K5S) * 0.15f);
                        return true;
                    case PakoVaihe.Valmis:
                        // Nousu nykyiseen linnaan jatkaa K5:stä (SeikkailuKappeli kuuntelee Valmis); ilman kuuntelijaa himmennys.
                        ydin.Valmistui = false; kirjaa?.Invoke("seikkailu: PAKO VALMIS");
                        SeikkailuAanet.Silmukka("uinti", false, vene); SeikkailuAanet.Silmukka("airot", false, vene);
                        if (Valmis != null) Valmis.Invoke(); else SeikkailuNakyvyys.Himmennys = 1f;
                        return false;
                }
                return false;
            };
        }

        /// <summary>Kiinnijäänti köysilaskussa tai kalliolla: pako takaisin Kello-vaiheeseen (Kiinnitä taas krampin luona, 45 s alusta).</summary>
        void Kiinni(string osa) { if (ydin.Kiinni()) kirjaa?.Invoke("seikkailu: pako keskeytyi kiinnijääntiin → köysi kramppiin uudelleen"); }

        void AsetaKoysi(bool paalla) { OhjattuVerbi = paalla ? Matkakirja.Peli.Tekstit.T("olavinlinna.verbi.katkaise") : null; OhjattuToimi = paalla ? (Action)Katkaise : null; }

        void Katkaise() { if (ydin.Katkaise()) Katkaistu(); }

        /// <summary>Köysi poikki (pelaaja tai armo): äänet ja repliikit, sitten K5.</summary>
        void Katkaistu()
        {
            ydin.Katkaistu = false;
            AsetaKoysi(false);
            SeikkailuAanet.SoitaTaiVara("koysi-katkeaa", "raapaisu", koysi, 0.9f, 0.8f);
            SeikkailuAanet.SoitaTaiVara("vesisanko", "molskahdus", koysi, 0.7f, 0.9f);   // vesisanko vain linnan pankissa → molskahdus   // vartija istahtaa matalaan veteen vahingoittumatta (omistajan päätös 1)
            if (koysiVene != null) StartCoroutine(KoysiVajoaa(koysiVene));
            kirjaa?.Invoke("seikkailu: köysi katkaistu → K5");
            SeikkailuRepliikit.SoitaTaiVara("ranta-vartija-1", null, koysi + Vector3.up * 1.2f);   // istahtaa matalaan veteen
            SeikkailuRepliikit.SoitaTaiVara("soutaja-pako-2", null, vene + Vector3.up * 1.2f);
        }

        public void TaytaM(MTila m) => m.Kello = ydin.Vaihe != PakoVaihe.Odottaa;
        /// <summary>Jatko: hälytys on jo soinut → pako alkaa krampista (ei kelloa uudelleen; vartijat valppaina jatkon armon jälkeen).</summary>
        public void PalautaM(MTila m)
        {
            if (!m.Kello || ydin.Vaihe != PakoVaihe.Odottaa) return;
            ydin.ArkkuAuki(); ydin.KelloSoi = false;
            kirjaa?.Invoke("seikkailu: jatko: pako alkaa krampista");
        }

        public static void Poista() { var a = Aktiivinen; Aktiivinen = null; if (a != null) Destroy(a.gameObject); OhjattuVerbi = null; OhjattuToimi = null; }
        readonly List<UnityEngine.Object> luodut = new List<UnityEngine.Object>();
        GameObject koysiMalli; Transform koysiVene;
        /// <summary>Katkaistu veneen puolikas vajoaa veteen 1,5 s ja katoaa (vartijan puolikas jää käteen).</summary>
        System.Collections.IEnumerator KoysiVajoaa(Transform t)
        {
            var alku = t.position;
            for (float s = 0; s < 1.5f && t != null; s += Time.deltaTime) { t.position = alku + Vector3.down * (0.6f * s / 1.5f); yield return null; }
            if (t != null) t.gameObject.SetActive(false);
        }
        void OnDestroy() { foreach (var o in luodut) if (o != null) Destroy(o); SeikkailuKomero.ArkkuAuki -= Halytyskello; SeikkailuVartijat.Kiinnijaatiin -= Kiinni; if (Aktiivinen == this) { Aktiivinen = null; OhjattuVerbi = null; OhjattuToimi = null; } }
    }
}
