/**
 * @typedef {Object} TypeaheadItemGroupData
 * @property {string} id
 * @property {string} label
 * @property {TypeaheadItemData[]} items
 */

/**
 * @typedef {Object} TypeaheadItemData
 * @property {string} id
 * @property {string} type
 * @property {string} link
 * @property {string} icon
 * @property {string} thumbnail
 * @property {string} title
 * @property {string} label
 * @property {string} desc
 */

function htmlHelper() {
	return {
		/**
		 * Return the HTML of an item group
		 *
		 * @param {TypeaheadItemGroupData} data
		 * @return {HTMLElement|void}
		 */
		getItemGroupElement: function ( data ) {
			const itemGroup = document.createElement( 'li' );
			itemGroup.classList.add( 'citizen-typeahead-item-group' );
			itemGroup.setAttribute( 'data-group', `${ data.id }` );
			itemGroup.setAttribute( 'role', 'presentation' );

			if ( data.label ) {
				const label = document.createElement( 'span' );
				label.classList.add( 'citizen-typeahead-item-group-label' );
				label.innerText = data.label;
				itemGroup.append( label );
			}

			if ( data.items ) {
				const list = document.createElement( 'ol' );
				list.classList.add( 'citizen-typeahead-item-group-list' );
				list.setAttribute( 'role', 'presentation' );
				data.items.forEach( ( itemData, index ) => {
					itemData.id = `citizen-typeahead-${ data.id }-${ index }`;
					const item = this.getItemElement( itemData );
					list.append( item );
				} );
				itemGroup.append( list );
			}

			return itemGroup;
		},
		/**
		 * Generate menu item HTML using the existing template
		 *
		 * @param {TypeaheadItemData} data
		 * @return {HTMLElement|void}
		 */
		getItemElement: function ( data ) {
			// TODO: Should we use template element or Mustache or just Javascript?
			const template = document.getElementById( 'citizen-typeahead-template' );

			// Shouldn't happen but just to be safe
			if ( !( template instanceof HTMLTemplateElement ) ) {
				return;
			}

			const
				fragment = template.content.cloneNode( true ),
				item = fragment.querySelector( '.citizen-typeahead__item' );

			this.updateItemElement( item, data );
			return fragment;
		},
		/**
		 * Update typeahead item element
		 *
		 * @param {HTMLElement} item
		 * @param {TypeaheadItemData} data
		 */
		updateItemElement: function ( item, data ) {
			if ( data.id ) {
				item.setAttribute( 'id', data.id );
			}
			if ( data.type ) {
				item.classList.add( `citizen-typeahead__item-${ data.type }` );

				if ( data.type !== 'placeholder' ) {
					item.setAttribute( 'role', 'option' );
				}
			}

			if ( data.size ) {
				item.classList.add( `citizen-typeahead__item-${ data.size }` );
			}
			if ( data.link ) {
				item.querySelector( '.citizen-typeahead__content' ).setAttribute( 'href', data.link );
			}
			if ( data.icon || data.thumbnail ) {
				const thumbnail = item.querySelector( '.citizen-typeahead__thumbnail' );
				if ( data.thumbnail ) {
					thumbnail.style.backgroundImage = `url('${ data.thumbnail }')`;
				} else {
					thumbnail.classList.add(
						'citizen-typeahead__thumbnail',
						'citizen-ui-icon',
						`mw-ui-icon-wikimedia-${ data.icon }`
					);
				}
			}
			if ( data.title ) {
				item.querySelector( '.citizen-typeahead__title' ).innerHTML = data.title;
			}
			if ( data.label ) {
				item.querySelector( '.citizen-typeahead__label' ).innerHTML = data.label;
			}
			if ( data.desc ) {
				item.querySelector( '.citizen-typeahead__description' ).innerHTML = data.desc;
			}
		},
		/**
		 * Remove item group from the typeahead DOM
		 *
		 * @param {HTMLElement} typeaheadEl
		 * @param {string} id
		 */
		removeItemGroup: function ( typeaheadEl, id ) {
			typeaheadEl.querySelector( `.citizen-typeahead-item-group[data-group="${ id }"]` )?.remove();
		}
	};
}

/** @module htmlHelper */
module.exports = htmlHelper;
