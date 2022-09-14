#!/bin/bash
echo "---
title: \"\"
publishdate: $( date --rfc-3339="date" )
date: $( echo $1 | sed 's/.html//g' | sed 's/\(....\)\(..\)\(..\)/\1-\2-\3/g' )
previewimage: \"\"
draft: false
---

$(cat $1\
| sed '1,/<main>/d'\
| sed '/<\/main>/,$d'\
| sed -E 's%(<(/){0,1}p>|(<(/){0,1}p>|<(/){0,1}ul>|<(/){0,1}h[1-6]>)|^ *)%%gm;t;d'\
| sed -E 's%(<li>)([ -~]+)(<\/li>)% - \2%g'\
| sed -E 's%(<img src="https:\/\/hsaliba-photo.us-southeast-1.linodeobjects.com\/imported\/)(.*)(" alt=")(.*)(" class="exif">)%{{< hostedimage src="\2" alt="\4" >}}")%g'\
| sed -E 's%(<a href=")(.*)(">)(.*)(<\/a>)%[\4](\2)%g')" > "$(echo $1 | sed 's/.html//g').md"