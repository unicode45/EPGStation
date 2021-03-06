import * as m from 'mithril';
import Util from '../../Util/Util';
import RecordedMenuViewModel from '../../ViewModel/Recorded/RecordedMenuViewModel';
import factory from '../../ViewModel/ViewModelFactory';
import Component from '../Component';

/**
 * RecordedMenuComponent
 */
class RecordedMenuComponent extends Component<void> {
    private viewModel: RecordedMenuViewModel;

    constructor() {
        super();
        this.viewModel = <RecordedMenuViewModel> factory.get('RecordedMenuViewModel');
    }

    /**
     * view
     */
    public view(): m.Child {
        const ruleId = this.viewModel.getRuleId();

        return m('div', { class: 'recorded-menu' }, [
            this.createItem({
                style: ruleId === null ? 'display: none;' : '',
                onclick: () => {
                    this.viewModel.close();
                    if (Number(m.route.param('rule')) === ruleId) { return; }
                    Util.move('/recorded', { rule: ruleId });
                },
            }, 'search', 'search'),
            this.createItem({
                style: this.viewModel.isEnableEncode() ? '' : 'display: none;',
                onclick: () => {
                    this.viewModel.openEncode();
                },
            }, 'add_circle_outline', 'encode'),
            this.createItem({
                style: this.viewModel.isEncoding() ? '' : 'display: none;',
                onclick: () => {
                    this.viewModel.cancelEncode();
                    this.viewModel.close();
                },
            }, 'stop', 'stop'),
            this.createItem({
                onclick: () => {
                    this.viewModel.openDelete();
                },
            }, 'delete', 'delete'),
        ]);
    }

    private createItem(attrs: { [key: string]: any }, iconName: string, text: string): m.Child {
        attrs.class = 'menu-item';

        return m('div', attrs, [
            m('i', { class: 'menu-icon material-icons' }, iconName),
            m('div', { class: 'menu-text' }, text),
        ]);
    }
}

export default RecordedMenuComponent;

