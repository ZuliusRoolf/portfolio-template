
export function populateBiography(document) {
    fetch('content/biography.json')
        .then(response => response.json())
        .then(data => {
            const biography = data;
            const template = document.getElementById('biography__template');
            document.title = biography.name;

            //Picture, Name, Profession
            template.querySelector('.biography__picture img').src = biography.portrait;
            template.querySelector('.introduction__name').textContent = biography.name;
            template.querySelector('.introduction__profession').textContent = biography.profession.toLowerCase();

            //Workplace
            if (biography.workplace !== '') {
                template.querySelector('.introduction__workplace__preface').textContent = biography.workplacePreface;
                template.querySelector('.introduction__workplace').textContent = biography.workplace;
                template.querySelector('.introduction__workplace').href = biography.workplaceLink;
            }
            else template.querySelector('#if__introduction__workplace').remove();

            //Links
            const templateLinks = template.querySelectorAll('.biography__social__link');
            var email = ""
            for (let i = 1; i < templateLinks.length; i++) templateLinks[i].remove();
            biography.links.forEach(biographyLink => {
                const templateLink = templateLinks[0].cloneNode(true);
                templateLink.removeAttribute('id');
                templateLink.href = biographyLink.link;
                templateLink.textContent = biographyLink.name;
                if (biographyLink.name.toLowerCase() === 'email') {
                    email = biographyLink.link;
                }
                template.querySelector('.biography__social').appendChild(templateLink);
                template.querySelector('.biography__social').appendChild(document.createTextNode(' '));
            });

            //About
            if (biography.about !== '') {
                template.querySelector('.biography__about').innerHTML = biography.about.replace(/\n/g, '<br>');
                template.querySelector('.biography__about').innerHTML += '<br><br>';
                template.querySelector('.biography__about').innerHTML += email ? `<a href="${email}">${email.replace('mailto:', '')}</a>` : '';
            }
            else {
                template.querySelector('#if__biography__about').remove();
                template.querySelector('.biography__about').remove();
            }
        });
};

export function populatePortfolio(document) {
    fetch('content/portfolio.json')
        .then(response => response.json())
        .then(data => {
            const portfolioContainer = document.getElementById('portfolio__container');
            const projects = document.getElementById('projects');

            if (data.defaultPreloadImage !== '')
                projects.querySelector('#project0 .project__video video').poster = data.defaultPreloadImage;

            //Portfolio Projects
            data.portfolio.forEach(project => {
                var index = projects.childElementCount;

                const button = portfolioContainer.querySelector('#project__button__template').cloneNode(true);
                button.removeAttribute('id');
                button.setAttribute('data-template-id', 'project' + index);
                button.querySelector('.project__button__title').textContent = project.title;
                button.querySelector('.project__button__year').textContent = project.year;
                portfolioContainer.appendChild(button);
                
                const template = projects.querySelector('#project0').cloneNode(true);
                template.setAttribute('id', 'project' + index);
                template.querySelector('.project__video video source').src = project.video;
                if (project.image !== '')
                    template.querySelector('.project__video video').poster = project.image;
                template.querySelector('.project__contribution__company__logo').src = project.companyLogo;
                template.querySelector('.project__contribution__company').textContent = project.companyName;
                if (project.collaborators !== '')
                    template.querySelector('.project__contribution__collaborators').textContent = project.collaborators;
                else template.querySelector('#if__project__contribution__collaborators').remove();
                template.querySelector('.project__description__title').textContent = project.descriptiveTitle;
                template.querySelector('.project__description__text').textContent = project.reason;
                template.querySelector('.project__redirect').href = project.sourceLink;
                template.querySelector('.project__redirect').setAttribute('data', project.sourceName);
                projects.appendChild(template);
            });
            const originalTemplate = portfolioContainer.querySelector('#project__button__template');

            const htmlDateEdit = new Date(document.lastModified);
            const jsonDateEdit = new Date(data.lastModified);

            const dateObj = htmlDateEdit > jsonDateEdit ? htmlDateEdit : jsonDateEdit;
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            const month = monthNames[dateObj.getMonth()];
            const year = dateObj.getFullYear().toString().slice(-2); // Get last two digits of the year

            const formattedDate = `${month} '${year}`;
            originalTemplate.querySelector('.project__button__year').textContent = formattedDate;
            originalTemplate.querySelector('.project__button__title').style.display = 'none';
            originalTemplate.classList.add('timestamp');
        });
};

// export function populateExperience(document) {
//     fetch('content/experience.json')
//         .then(response => response.json())
//         .then(data => {

//         });
// };
