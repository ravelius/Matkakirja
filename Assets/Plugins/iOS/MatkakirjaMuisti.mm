// MUISTITARKKA (Natiiviseppä 9.10.2026; PT: junan 173 iPad-jetsamin juurisyy MITTAAMALLA ennen korjausta). Prosessin muisti
// luokittain: task_vm_info-kirjanpito (jetsam-raja koskee phys_footprintia) ja malloc-vyöhykkeet, sekä VM-alueet tunnisteittain.
// Linssit/Unity/MuistiTarkka.cs lukee nämä taustasäikeessä vain, kun Documents/muisti-tarkka.txt on olemassa.
#include <mach/mach.h>
#include <mach/task_info.h>
#include <mach/vm_map.h>
#include <mach/vm_statistics.h>
#include <malloc/malloc.h>
#include <os/proc.h>
#include <stdint.h>

// out (tavua, −1 = ei saatavilla): 0 phys_footprint, 1 vapaa (os_proc_available_memory), 2 internal (anonyymi CPU-muisti),
// 3 compressed, 4 grafiikka (graphics-kirjanpito + pakattu: Metal-resurssit), 5 media, 6 neural, 7 network, 8 purgeable nonvolatile,
// 9 resident, 10 malloc käytössä, 11 malloc varattu, 12 footprint-huippu, 13 external, 14 reusable, 15 grafiikka ei-footprint.
extern "C" int MatkakirjaMuisti_Tila(int64_t* out, int n)
{
    if (out == NULL || n <= 0) return 0;
    task_vm_info_data_t vi = {};
    mach_msg_type_number_t c = TASK_VM_INFO_COUNT;
    if (task_info(mach_task_self(), TASK_VM_INFO, (task_info_t)&vi, &c) != KERN_SUCCESS) return 0;
    malloc_statistics_t ms = {};
    malloc_zone_statistics(NULL, &ms);
    bool r3 = c >= TASK_VM_INFO_REV3_COUNT;
    int64_t v[16];
    v[0] = (int64_t)vi.phys_footprint;
    v[1] = (int64_t)os_proc_available_memory();
    v[2] = (int64_t)vi.internal;
    v[3] = (int64_t)vi.compressed;
    v[4] = r3 ? vi.ledger_tag_graphics_footprint + vi.ledger_tag_graphics_footprint_compressed : -1;
    v[5] = r3 ? vi.ledger_tag_media_footprint + vi.ledger_tag_media_footprint_compressed : -1;
    v[6] = r3 ? vi.ledger_tag_neural_footprint + vi.ledger_tag_neural_footprint_compressed : -1;
    v[7] = r3 ? vi.ledger_tag_network_nonvolatile + vi.ledger_tag_network_nonvolatile_compressed : -1;
    v[8] = r3 ? vi.ledger_purgeable_nonvolatile + vi.ledger_purgeable_novolatile_compressed : -1;
    v[9] = (int64_t)vi.resident_size;
    v[10] = (int64_t)ms.size_in_use;
    v[11] = (int64_t)ms.size_allocated;
    v[12] = r3 ? vi.ledger_phys_footprint_peak : -1;
    v[13] = (int64_t)vi.external;
    v[14] = (int64_t)vi.reusable;
    v[15] = r3 ? vi.ledger_tag_graphics_nofootprint + vi.ledger_tag_graphics_nofootprint_compressed : -1;
    int k = n < 16 ? n : 16;
    for (int i = 0; i < k; i++) out[i] = v[i];
    return k;
}

// VM-alueet tunnisteittain (user_tag), alikartat (jaettu kirjastovälimuisti) ohitetaan. out[2g] = likainen + pakattu (tavua),
// out[2g+1] = resident. Ryhmät g: 0 malloc (1–13), 1 IOAccelerator (100), 2 IOSurface (88), 3 tunnisteeton (0: vm_allocate,
// mm. Unityn ja IL2CPP:n omat varaajat), 4 ImageIO (70), 5 ääni (90), 6 CoreGraphics/CoreAnimation (42, 51–58), 7 pinot (30),
// 8 sovelluskohtaiset (240–255), 9 muu. Palauttaa läpikäytyjen alueiden määrän.
extern "C" int MatkakirjaMuisti_Alueet(int64_t* out, int n)
{
    if (out == NULL || n < 20) return 0;
    for (int i = 0; i < 20; i++) out[i] = 0;
    vm_address_t osoite = 0;
    vm_size_t koko = 0;
    int alueita = 0;
    int64_t sivu = (int64_t)vm_page_size;
    for (;;)
    {
        natural_t syvyys = 0;
        vm_region_submap_info_data_64_t info;
        mach_msg_type_number_t cnt = VM_REGION_SUBMAP_INFO_COUNT_64;
        if (vm_region_recurse_64(mach_task_self(), &osoite, &koko, &syvyys, (vm_region_recurse_info_t)&info, &cnt) != KERN_SUCCESS) break;
        if (!info.is_submap)
        {
            unsigned t = info.user_tag;
            int g = (t >= 1 && t <= 13) ? 0 : t == 100 ? 1 : t == 88 ? 2 : t == 0 ? 3 : t == 70 ? 4 : t == 90 ? 5
                  : (t == 42 || (t >= 51 && t <= 58)) ? 6 : t == 30 ? 7 : (t >= 240 && t <= 255) ? 8 : 9;
            out[2 * g] += ((int64_t)info.pages_dirtied + (int64_t)info.pages_swapped_out) * sivu;
            out[2 * g + 1] += (int64_t)info.pages_resident * sivu;
            alueita++;
        }
        osoite += koko;
    }
    return alueita;
}
