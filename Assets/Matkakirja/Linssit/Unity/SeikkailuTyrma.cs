// HISTORIAMOOTTORI: TYRMÄ UNITYSSA (Siirtoseppä 7.10.2026; pelattavuusmalli 4.1 muunnelma 1; ydin Seikkailu.Tyrma; LR v44n osa
// tyrma-E101). Kiinnijäännin himmennyksen jälkeen pelaaja herää oljilta (istuu:pelaaja-tyrma, silmät 1,0 m, katse kierto_y:n suuntaan),
// valoa vain ilmaraosta. 3 s: Pulu kujertaa ilmaraosta ja avaimet (esine:avainnippu-tyrma) putoavat olkiin → poimi → "Avaa" ovella
// (ovi:tyrma, avain-lukko) → käytävän pää (ovi:tyrma-ulos) → himmennys ja viimeisin tarkistuspiste valppaana. 10 s ilman tekoa → vihje
// (toistuu 15 s), 45 s → lukko aukeaa (Ydin Tyrma). Avainten päälle astuminen poimii ja ovelle käveleminen avaimet kädessä avaa (11.10.,
// PT 07.0x, Laitetestaaja 5. kierros: avaimia ei poimittu kahdella käynnillä, lukko ratkaisi). Puuttuvat merkit → vanha kulku.
using System;
using System.Collections;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuTyrma : MonoBehaviour
    {
        public static SeikkailuTyrma Aktiivinen { get; private set; }
        public const float OviM = 1.5f, UlosM = 1.2f;
        Tyrma ydin = new Tyrma();
        Vector3 istuin, rako, avaimet, ovi, ulos, ryomi; float katse; bool ryomiOn;
        static int kerta;
        Action valmis; Action<string> kirjaa; string avainId;
        public Tyrma Ydin => ydin;

        /// <summary>Aloittaa tyrmän, jos merkit ovat datassa; muuten false (kutsuja palaa suoraan tarkistuspisteeseen).</summary>
        public static bool Aloita(Transform isa, SeikkailuPelaaja p, Action valmis, Action<string> kirjaa)
        {
            var d = SeikkailuKavely.Data; if (d == null || p == null) return false;
            KavelyMerkki M(string n) { foreach (var m in d.Merkit) if (m.Nimi == n) return m; return null; }
            Vector3 U(KavelyMerkki m) => new Vector3((float)m.X, (float)m.Y, (float)-m.Z);
            var mi = M("istuu:pelaaja-tyrma"); var mo = M("ovi:tyrma"); var mu = M("ovi:tyrma-ulos");
            if (mi == null || mo == null || mu == null) return false;
            Poista();
            var go = new GameObject("Seikkailu tyrmä"); go.transform.SetParent(isa, false);
            var t = go.AddComponent<SeikkailuTyrma>();
            t.istuin = U(mi); t.ovi = U(mo); t.ulos = U(mu); t.valmis = valmis; t.kirjaa = kirjaa;
            t.rako = M("ilmarako:tyrma") is KavelyMerkki mr ? U(mr) : t.istuin + Vector3.up * 2f;
            var ma = M("esine:avainnippu-tyrma"); t.avainId = ma?.Tunnus; t.avaimet = ma != null ? U(ma) : t.istuin + Vector3.right * 2f;
            t.katse = mi.KiertoY is double ky ? (float)(-ky * 180 / Math.PI) : 0f;
            // Muunnelmat vuorotellen (1 avaimet, 2 vesipoika, 3 irtokivi); puuttuvat merkit → muunnelma 1.
            var mry = M("ovi:tyrma-ryomi"); var mk = M("esine:irtokivi-tyrma"); t.ryomiOn = mry != null && mk != null; if (mry != null) t.ryomi = U(mry);
            if (mk != null) t.aukonSuu = U(mk);
            int mu1 = kerta++ % 3 + 1;
            if (mu1 == 3 && !t.ryomiOn || mu1 == 1 && ma == null) mu1 = 2;
            t.ydin = new Tyrma(mu1);
            SeikkailuEsineet.Irrotettiin += t.KiviIrti; SeikkailuEsineet.Raapaistiin += t.Yritys;
            Aktiivinen = t;
            // Kynttilä palaa tyrmään tultaessa (PT 11.10. 06.2x, Laitetestaajan 4. kierros: ensikertalaisen tyrmä lähes musta, kun oma
            // kynttilä oli sammuksissa); toimintonappi sammuttaa ja sytyttää kuten ennen. Pöydälle asetettu kynttilä jää paikalleen.
            var kyn = SeikkailuKynttilat.Aktiivinen;
            if (kyn != null && kyn.Ydin.OmaKynttila && !kyn.Ydin.OmaPalaa && kyn.OmaAsetettu == null) { kyn.Ydin.AsetaOma(true); kirjaa?.Invoke("seikkailu: tyrmä: oma kynttilä sytytetty"); }
            // Käsittely käsin (pelattavuusmalli 6): oven veto avaimet kädessä; 60° = auki, nopea veto narahtaa (4 m). Napautus avaa kuten ennen.
            float kertyma = 0f;
            SeikkailuKasittely.Lisaa(new SeikkailuKasittely.Kasiteltava
            {
                Nimi = "tyrma-ovi", Paikka = () => t.ovi + Vector3.up, Tarjolla = pl => t != null && t.OviLahella(pl),
                Kaanna = (pl, asteet, narahti) =>
                {
                    if (t == null) return;
                    kertyma += Mathf.Abs((float)asteet);
                    if (narahti) { SeikkailuAanet.SoitaJokin(SeikkailuAanet.PaksuOviNarina, "luukku-narahdus", t.ovi + Vector3.up, 0.8f); SeikkailuVartijat.Aani(t.ovi, 4); }   // tammiovi
                    if (kertyma >= 60f) { kertyma = 0f; t.AvaaOvi(pl); }
                },
                Loppui = () => kertyma = 0f,
            });
            // Kuunvalo ilmaraosta (valo:tyrma-rako): volumetrinen säde lattialle laatutason salliessa.
            if (M("valo:tyrma-rako") is KavelyMerkki mv) SeikkailuValot.Saede(go.transform, U(mv), (t.istuin - U(mv)) + Vector3.down * 0.5f, new Color(0.62f, 0.7f, 0.85f), 0.9f, 6f, 30f, DioraamaNayttamoKerros());
            // Herätessä katse huoneeseen (omistaja TF 180: kamera tuijotti seinää, merkin kierto_y osoittaa poispäin ovesta): oven ja
            // pudotettavien avainten välisuuntaan (muunnelma 1), muuten ovelle. Ovi painaa nelinkertaisesti (v6 tyrma-ovi 04.2x: tasan
            // välissä ovi 38° sivulla, kuvan ulkopuolella; v7 2× → 23°, yhä reunassa: kuva-ala kapeampi; nyt ~13°, ovi kuvan oikealla).
            Vector3 Suunta(Vector3 a) { var v = a - t.istuin; v.y = 0; return v.sqrMagnitude > 1e-4f ? v.normalized : Vector3.zero; }
            var kohti = 4f * Suunta(t.ovi) + (t.ydin.Muunnelma == 1 ? Suunta(t.avaimet) : t.ydin.Muunnelma == 3 && t.ryomiOn ? Suunta(t.ryomi) : Vector3.zero);
            if (kohti.sqrMagnitude > 1e-4f) t.katse = Mathf.Atan2(kohti.x, kohti.z) * Mathf.Rad2Deg;
            t.piilossa = SeikkailuKavely.PiilotaPaallekkaiset(mi.Osa, kirjaa);   // dioraaman keittiö tyrmän ympäriltä (täysmustat levyt)
            p.Siirra(t.istuin + Vector3.up * 0.05f); p.Tila.KameraYaw = p.Tila.HahmoYaw = t.katse; p.Tila.KameraPitch = 4;
            p.LiikeEstettyAsti = Time.unscaledTime + 2.5f;   // kiinniotossa pidetty tappi ei vie heränneenä seinään (tyrmä-pako 11.10. 00.46)
            DioraamaTaulu.NaytaSeikkailunNimi(Kieli.T("olavinlinna.seikkailu.tyrma.nimi"));   // tyrmän nimi kerran ~3 s (Raamattu NIMIKYLTIT HETKEN)
            SeikkailuNakyvyys.Himmennys = 0f;
            if (SeikkailuVihjeet.Aktiivinen != null) SeikkailuVihjeet.Aktiivinen.Ydin.Tyrmassa = true;
            SeikkailuRepliikit.SoitaTaiVara("tyrma-vartija-vienti-1", null, t.ovi + Vector3.up * 1.6f);   // vartija sulkee oven (repliikit-lapi-v1)
            SeikkailuEsineet.Kolahti += t.Kolina;
            // Alarajavalo (Laitetestaaja v6 3. kierros: ilman kynttilää lähes musta): käytävän soihdun kajo oven raoista sisään.
            var sisaan = t.istuin - t.ovi; sisaan.y = 0; sisaan = sisaan.sqrMagnitude > 1e-4f ? sisaan.normalized : Vector3.zero;
            t.Kajo("tyrma-oven-kajo", t.ovi + sisaan * 0.45f + Vector3.up * 0.35f, new Color(1f, 0.62f, 0.34f), 0.55f, 3.2f);
            go.AddComponent<SeikkailuTyrmaAanet>().Alusta(t, t.istuin, t.ovi, t.rako, t.avaimet, t.ryomiOn ? t.ryomi : t.ovi, kirjaa);   // tippuva vesi, askeleet, ohjaava ääni (Pelikoodari 11.10., PT B3)
            kirjaa?.Invoke($"seikkailu: tyrmä (muunnelma {t.ydin.Muunnelma}: {(t.ydin.Muunnelma == 1 ? "avaimet ilmaraosta" : t.ydin.Muunnelma == 2 ? "vesipojan ovi" : "irtokivi")})");
            return true;
        }

        void Update()
        {
            var p = SeikkailuPelaaja.Aktiivinen; if (p == null) return;
            ydin.Paivita(Time.deltaTime);
            if (ydin.PuluPudotti)
            {
                ydin.PuluPudotti = false;
                // Pulu pois videopelistä (omistaja 8.10. 19.0x): avaimet pudotetaan ilmaraosta (askeleet ja avainnipun helinä raossa).
                if (SeikkailuVartijat.AskelKlippi != null) AudioSource.PlayClipAtPoint(SeikkailuVartijat.AskelKlippi, rako, 0.5f * SeikkailuAanet.Taso("tehosteet", SeikkailuVartijat.VartijanAskeleet));
                SeikkailuAanet.SoitaTaiVara("avainnippu", "avain-lukko", rako, 0.8f);
                if (avainId != null) SeikkailuEsineet.Aktiivinen?.Nayta(avainId, avaimet);
                SeikkailuAanet.Soita("kivi-lasku", avaimet, 0.4f, 1.6f);   // avaimet kilahtavat olkiin
                Kajo("tyrma-kuunsade-avaimet", avaimet + Vector3.up * 0.6f, new Color(0.62f, 0.71f, 0.85f), 0.45f, 1.6f);   // ilmaraon kuu avaimiin
                kirjaa?.Invoke("seikkailu: tyrmä: avaimet pudotettiin ilmaraosta");
            }
            if (ydin.VesipoikaAvasi)
            {
                ydin.VesipoikaAvasi = false;
                if (SeikkailuVartijat.AskelKlippi != null) AudioSource.PlayClipAtPoint(SeikkailuVartijat.AskelKlippi, ovi, 0.6f * SeikkailuAanet.Taso("tehosteet", SeikkailuVartijat.VartijanAskeleet));
                SeikkailuAanet.Soita("kivi-kolahdus", ovi + Vector3.up * 0.3f, 0.7f, 0.7f);   // sanko kolahtaa
                SeikkailuAanet.SoitaTaiVara("salpa-2", null, ovi + Vector3.up, 0.6f);         // salpa auki (sonniss-aanet-v3)
                SeikkailuRepliikit.SoitaTaiVara("tyrma-vesipoika-1", null, ovi + Vector3.up * 1.4f);   // "Vettä sinulle. Ovi taisi jäädä auki."
                SeikkailuAanet.SoitaJokin(SeikkailuAanet.PaksuOviNarina, "luukku-narahdus", ovi + Vector3.up, 0.8f);   // ovi jää raolleen
                SeikkailuEsineet.Aktiivinen?.OviLehti("tyrma", true); OviValo();
                kirjaa?.Invoke("seikkailu: tyrmä: vesipoika jätti oven raolleen");
            }
            if (ydin.Vihje) { ydin.Vihje = false; SeikkailuVihjeet.Aktiivinen?.Pakota(2, "tyrmä 20 s"); }   // kieli: ei (tekninen)
            // Oven vihje (PT 06.0x, Laitetestaaja 4. kierros: muunnelma 3 lukko auki 630 s, ilman vihjettä ulos vasta 1015 s; pyydetty
            // vihje vei ulos 14 s:ssa): heti Pulun avatessa ja 20 s:n välein, kunnes pelaaja on ulkona.
            if (ydin.OviVihje) { ydin.OviVihje = false; SeikkailuVihjeet.Aktiivinen?.Pakota(2, "tyrma-ovi-auki"); }   // kieli: ei (tekninen)
            if (ydin.Vaihe == TyrmanVaihe.AvaimetOlissa && avainId != null && SeikkailuEsineet.Aktiivinen?.Kadessa == avainId) ydin.Poimi();
            // Muunnelma 1 ilman nappia (PT 07.0x, Laitetestaaja 5. kierros: avaimet mustilla oljilla, kahdella käynnillä ei poimintaa):
            // avainten päälle astuminen poimii (toiminto vain, kun avaimet ovat valitsimen lähin), ovelle käveleminen avaimet kädessä avaa.
            var es = SeikkailuEsineet.Aktiivinen;
            if (ydin.Vaihe == TyrmanVaihe.AvaimetOlissa && avainId != null && es != null && es.Lahin == avainId && es.Paikka(avainId) is Vector3 ak
                && Vaaka(p.transform.position, ak) < AstuPoimiM) SeikkailuEsineet.ToimintoPyydetty = true;
            if (ydin.Vaihe == TyrmanVaihe.AvaimetKadessa && Vaaka(p.transform.position, ovi) < KavelyAvaaM) AvaaOvi(p);
            if (ydin.PuluAvasi)
            {
                // Tyrma.PuluAvaaS (45 s, ennen 60): ovi aukeaa oikeasti (A3: ennen vain lokiin), myös irtokiven muunnelmassa ulos oven kautta.
                ydin.PuluAvasi = false; puluAvasi = true;
                SeikkailuAanet.SoitaJokin(SeikkailuAanet.LukkoAuki, "avain-lukko", ovi + Vector3.up, 0.8f);
                SeikkailuEsineet.Aktiivinen?.OviLehti("tyrma", false); OviValo();
                kirjaa?.Invoke($"seikkailu: tyrmä: lukko aukesi ({Tyrma.PuluAvaaS:F0} s), ovi auki");
            }
            // Muunnelma 2: raollaan oleva ovi aukeaa kävelemällä (pelaaja oven luona).
            if (ydin.Muunnelma == 2 && ydin.Vaihe == TyrmanVaihe.OviAuki && !tyonnetty && Vector3.Distance(p.transform.position, ovi) < TyontoM)
            {
                tyonnetty = true; SeikkailuEsineet.Aktiivinen?.OviLehti("tyrma", false);
                SeikkailuAanet.SoitaJokin(SeikkailuAanet.PaksuOviNarina, "luukku-narahdus", ovi + Vector3.up, 0.5f);
                kirjaa?.Invoke("seikkailu: tyrmä: ovi työnnetty auki");
            }
            // Muunnelma 2: torkkuva vartija oven takana mutisee kerran, kun pelaaja tulee ovelle (repliikit-lapi-v1).
            if (ydin.Muunnelma == 2 && !rotatKuultu && Vector3.Distance(p.transform.position, ovi) < 2.5f)
            { rotatKuultu = true; SeikkailuRepliikit.SoitaTaiVara("tyrma-vartija-rotat-1", null, ovi + Vector3.up * 1.6f); }
            // Muunnelma 3: ryömintä alkaa aukon suulta (irtokiven paikka); merkin ovi:tyrma-ryomi pää on seinän takana (~2 m), jonne
            // kävellen ei pääse (A3, Laitetestaaja TF 180: irtokiven pakoa ei saatu tehtyä).
            // Aukko kelpaa aina, kun kivi on irti (myös Pulun avattua oven); ennen avausta ovi on kiinni, joten ulos ja ovi eivät täyty.
            bool aukko = ydin.Muunnelma == 3 && ryomiOn && ydin.AukkoAuki;
            // Oviaukko riittää (Laitetestaaja 181d, HID-toisto 03.51: liike toimii, mutta auki oleva ovi ja käytävä näkyivät mustina aukkoina).
            var pp = p.transform.position;
            bool perilla = aukko && Vector3.Distance(pp, aukonSuu) < RyomiM || Vector3.Distance(pp, ulos) < UlosM
                || Vector3.Distance(pp, ovi) < OviLapiM && oviAukesi >= 0 && Time.unscaledTime - oviAukesi >= OviNakyyS;
            if (ydin.Vaihe == TyrmanVaihe.OviAuki && perilla && ydin.Ulos()) StartCoroutine(Ulos());
        }

        /// <summary>Toimintonappi ovella avaimet kädessä (SeikkailuEsineet kysyy verbin ja kutsuu).</summary>
        public bool OviLahella(SeikkailuPelaaja p) => ydin.Vaihe == TyrmanVaihe.AvaimetKadessa && p != null && Vector3.Distance(p.transform.position, ovi) < OviM;

        public void AvaaOvi(SeikkailuPelaaja p)
        {
            if (!OviLahella(p) || !ydin.AvaaOvi()) return;
            p.KasiEle("luukku");
            SeikkailuAanet.SoitaJokin(SeikkailuAanet.LukkoAuki, "avain-lukko", ovi + Vector3.up, 0.8f);
            if (avainId != null) SeikkailuEsineet.Aktiivinen?.Piilota(avainId);
            SeikkailuEsineet.Aktiivinen?.OviLehti("tyrma", false); OviValo();
            kirjaa?.Invoke("seikkailu: tyrmä: ovi auki");
        }

        IEnumerator Ulos()
        {
            SeikkailuNakyvyys.Himmennys = 1f;
            yield return new WaitForSecondsRealtime(SeikkailuNakyvyys.HimmennysS);
            kirjaa?.Invoke($"seikkailu: tyrmästä ulos {ydin.Aika:F0} s:ssa");
            if (SeikkailuVihjeet.Aktiivinen != null) SeikkailuVihjeet.Aktiivinen.Ydin.Tyrmassa = false;
            valmis?.Invoke();
            yield return new WaitForSecondsRealtime(0.3f);
            SeikkailuNakyvyys.Himmennys = 0f;
            Destroy(gameObject);
        }

        static int DioraamaNayttamoKerros() => DioraamaNayttamo.Kerros;

        public static void Poista() { var a = Aktiivinen; Aktiivinen = null; if (a != null) Destroy(a.gameObject); }
        /// <summary>Pulun vihjeen kohde tyrmässä: avaimet → ovi (1), ovi (2), irtokivi → aukko (3), lopuksi käytävän pää.</summary>
        public Vector3 VihjeKohde()
        {
            if (ydin.Vaihe == TyrmanVaihe.AvaimetOlissa) return avaimet;
            if (ydin.Vaihe == TyrmanVaihe.AvaimetKadessa) return ovi;
            if (ydin.Vaihe == TyrmanVaihe.Istuu && ydin.Muunnelma == 3) return SeikkailuEsineet.Aktiivinen?.Irrottamaton(ryomi) ?? ryomi;
            // Muunnelma 3: kivi irti → aukon suu (ryömintä alkaa siitä); Pulun 60 s:n avauksen jälkeen ulos oven kautta (A3).
            if (ydin.Muunnelma == 3 && ryomiOn && ydin.AukkoAuki && !puluAvasi) return aukonSuu;
            // Ovi auki: ensin itse ovi huoneesta näkyvänä (v8: kohde käytävän päässä seinän takana), oven luona käytävän pää.
            var pl = SeikkailuPelaaja.Aktiivinen;
            if (ydin.Vaihe == TyrmanVaihe.OviAuki) return pl != null && Vector3.Distance(pl.transform.position, ovi) > OviVihjeM ? ovi : ulos;
            return ovi;
        }

        void KiviIrti(string id) { if (id.StartsWith("irtokivi", StringComparison.Ordinal) && ydin.KiviIrti()) { kirjaa?.Invoke("seikkailu: tyrmä: irtokivi irti, aukko auki"); Kolina(ovi); } }

        /// <summary>Kova ääni tyrmässä (muunnelmat 2–3): käytävän vartija vain mutisee (malli 4.1), enintään 12 s:n välein.</summary>
        float kolinaAsti; bool rotatKuultu, puluAvasi, tyonnetty;
        // Oviaukko vasta, kun ovi on ollut auki OviNakyyS (v6 laituri-a1 04.11: avain lukkoon ovella → ulos samalla sekunnilla, ovea ei nähty).
        const float TyontoM = 1.3f, RyomiM = 1.0f, OviLapiM = 0.8f, OviNakyyS = 1.2f, OviVihjeM = 1.5f;
        /// <summary>Avainten päälle astuminen (vaaka) ja ovelle käveleminen avaimet kädessä (oven keskikohta seinän sisällä 0,4 m:n
        /// syvyydellä: kapseli pysähtyy oven eteen ~0,5 m:n päähän).</summary>
        public const float AstuPoimiM = 0.6f, KavelyAvaaM = 0.9f;
        static float Vaaka(Vector3 a, Vector3 b) { a.y = b.y = 0f; return Vector3.Distance(a, b); }
        Light oviValo; float oviAukesi = -1f;
        /// <summary>Käytävän lämmin valo oven avautuessa (soihtu käytävän päässä): auki oleva ovi erottuu pimeästä tyrmästä.</summary>
        void OviValo()
        {
            if (oviValo != null) return;
            oviAukesi = Time.unscaledTime;
            var g = new GameObject("Tyrmän käytävän valo") { layer = DioraamaNayttamo.Kerros }; g.transform.SetParent(transform, false);
            g.transform.position = Vector3.Lerp(ovi, ulos, 0.6f) + Vector3.up * 1.6f;
            oviValo = g.AddComponent<Light>(); oviValo.type = LightType.Point; oviValo.color = new Color(1f, 0.64f, 0.32f);
            oviValo.range = 5f; oviValo.intensity = 1.4f; oviValo.shadows = LightShadows.None; SeikkailuValot.MerkitseLiikkuvaksi(oviValo);
            SeikkailuValot.Liekki(g.transform, DioraamaNayttamo.Kerros);
        }
        Vector3 aukonSuu;
        /// <summary>Heikko pistevalo tyrmän alarajaksi (ovi ja avaimet erottuvat ilman kynttilää); poistuu tyrmän mukana.</summary>
        void Kajo(string nimi, Vector3 paikka, Color vari, float voima, float sade)
        {
            var g = new GameObject(nimi) { layer = DioraamaNayttamo.Kerros }; g.transform.SetParent(transform, false); g.transform.position = paikka;
            var l = g.AddComponent<Light>(); l.type = LightType.Point; l.color = vari; l.intensity = voima; l.range = sade; l.shadows = LightShadows.None;
            SeikkailuValot.MerkitseLiikkuvaksi(l);
        }
        void Kolina(Vector3 _)
        {
            if (ydin.Muunnelma < 2 || Time.unscaledTime < kolinaAsti) return;
            kolinaAsti = Time.unscaledTime + 12f;
            SeikkailuRepliikit.SoitaTaiVara("tyrma-vartija-kolina-1", null, ovi + Vector3.up * 1.6f);
        }
        void Yritys() => ydin.Yritys();

        System.Collections.Generic.List<GameObject> piilossa;
        void OnDestroy()
        {
            if (piilossa != null) foreach (var g in piilossa) if (g != null) g.SetActive(true);
            if (Aktiivinen == this) Aktiivinen = null;
            SeikkailuEsineet.Irrotettiin -= KiviIrti; SeikkailuEsineet.Raapaistiin -= Yritys; SeikkailuEsineet.Kolahti -= Kolina;
            SeikkailuKasittely.Poista("tyrma-ovi");
        }
    }
}
